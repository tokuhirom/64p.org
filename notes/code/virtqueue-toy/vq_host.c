#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <sys/ioctl.h>
#include <sys/mman.h>
#include <string.h>
#include <stdint.h>
#include <linux/kvm.h>

#define CR0_PE 1u
#define NOTIFY_PORT 0xE8

struct vm {
	int sys_fd;
	int fd;
	char *mem;
};

struct vcpu {
	int fd;
	struct kvm_run *kvm_run;
};

static void vm_init(struct vm *vm, size_t mem_size)
{
	int api_ver;
	struct kvm_userspace_memory_region memreg;

	vm->sys_fd = open("/dev/kvm", O_RDWR);
	if (vm->sys_fd < 0) { perror("open /dev/kvm"); exit(1); }

	api_ver = ioctl(vm->sys_fd, KVM_GET_API_VERSION, 0);
	if (api_ver != KVM_API_VERSION) {
		fprintf(stderr, "unexpected KVM api version\n");
		exit(1);
	}

	vm->fd = ioctl(vm->sys_fd, KVM_CREATE_VM, 0);
	if (vm->fd < 0) { perror("KVM_CREATE_VM"); exit(1); }

	if (ioctl(vm->fd, KVM_SET_TSS_ADDR, 0xfffbd000) < 0) {
		perror("KVM_SET_TSS_ADDR"); exit(1);
	}

	vm->mem = mmap(NULL, mem_size, PROT_READ | PROT_WRITE,
		       MAP_PRIVATE | MAP_ANONYMOUS | MAP_NORESERVE, -1, 0);
	if (vm->mem == MAP_FAILED) { perror("mmap mem"); exit(1); }
	madvise(vm->mem, mem_size, MADV_MERGEABLE);

	memreg.slot = 0;
	memreg.flags = 0;
	memreg.guest_phys_addr = 0;
	memreg.memory_size = mem_size;
	memreg.userspace_addr = (unsigned long) vm->mem;
	if (ioctl(vm->fd, KVM_SET_USER_MEMORY_REGION, &memreg) < 0) {
		perror("KVM_SET_USER_MEMORY_REGION"); exit(1);
	}
}

static void vcpu_init(struct vm *vm, struct vcpu *vcpu)
{
	int vcpu_mmap_size;

	vcpu->fd = ioctl(vm->fd, KVM_CREATE_VCPU, 0);
	if (vcpu->fd < 0) { perror("KVM_CREATE_VCPU"); exit(1); }

	vcpu_mmap_size = ioctl(vm->sys_fd, KVM_GET_VCPU_MMAP_SIZE, 0);
	if (vcpu_mmap_size <= 0) { perror("KVM_GET_VCPU_MMAP_SIZE"); exit(1); }

	vcpu->kvm_run = mmap(NULL, vcpu_mmap_size, PROT_READ | PROT_WRITE,
			     MAP_SHARED, vcpu->fd, 0);
	if (vcpu->kvm_run == MAP_FAILED) { perror("mmap kvm_run"); exit(1); }
}

static void setup_protected_mode(struct kvm_sregs *sregs)
{
	struct kvm_segment seg = {
		.base = 0,
		.limit = 0xffffffff,
		.selector = 1 << 3,
		.present = 1,
		.type = 11, /* Code: execute, read, accessed */
		.dpl = 0,
		.db = 1,
		.s = 1,
		.l = 0,
		.g = 1,
	};

	sregs->cr0 |= CR0_PE;
	sregs->cs = seg;

	seg.type = 3; /* Data: read/write, accessed */
	seg.selector = 2 << 3;
	sregs->ds = sregs->es = sregs->fs = sregs->gs = sregs->ss = seg;
}

int main(int argc, char **argv)
{
	const char *guest_img_path = argc > 1 ? argv[1] : "vq_guest.img";
	FILE *f = fopen(guest_img_path, "rb");
	struct vm vm;
	struct vcpu vcpu;
	struct kvm_sregs sregs;
	struct kvm_regs regs;
	size_t n;
	int notify_count = 0;

	if (!f) { perror("fopen guest image"); exit(1); }

	vm_init(&vm, 0x200000);
	vcpu_init(&vm, &vcpu);

	n = fread(vm.mem, 1, 0x200000, f);
	fclose(f);
	printf("[host] loaded %zu bytes of guest code at guest phys 0x0\n", n);

	if (ioctl(vcpu.fd, KVM_GET_SREGS, &sregs) < 0) { perror("KVM_GET_SREGS"); exit(1); }
	setup_protected_mode(&sregs);
	if (ioctl(vcpu.fd, KVM_SET_SREGS, &sregs) < 0) { perror("KVM_SET_SREGS"); exit(1); }

	memset(&regs, 0, sizeof(regs));
	regs.rflags = 2;
	regs.rip = 0;
	if (ioctl(vcpu.fd, KVM_SET_REGS, &regs) < 0) { perror("KVM_SET_REGS"); exit(1); }

	for (;;) {
		if (ioctl(vcpu.fd, KVM_RUN, 0) < 0) { perror("KVM_RUN"); exit(1); }

		switch (vcpu.kvm_run->exit_reason) {
		case KVM_EXIT_HLT:
			printf("[host] guest halted. doorbell rang %d time(s) "
			       "total (message was multiple bytes -- one exit "
			       "either way)\n", notify_count);

			if (ioctl(vcpu.fd, KVM_GET_REGS, &regs) < 0) {
				perror("KVM_GET_REGS"); exit(1);
			}
			printf("[host] guest rax=%lld (expect 42), "
			       "mem[0x400]=%ld (expect 42)\n",
			       regs.rax, *(long *) (vm.mem + 0x400));
			return 0;

		case KVM_EXIT_IO:
			if (vcpu.kvm_run->io.direction == KVM_EXIT_IO_OUT &&
			    vcpu.kvm_run->io.port == NOTIFY_PORT) {
				uint32_t len;
				notify_count++;
				memcpy(&len, vm.mem + 0x2000, sizeof(len));
				printf("[host] doorbell #%d: ring says len=%u "
				       "bytes -- reading straight out of guest "
				       "memory (no per-byte trap):\n",
				       notify_count, len);
				fwrite(vm.mem + 0x1000, 1, len, stdout);
				continue;
			}
			fprintf(stderr, "unexpected IO port %x\n",
				vcpu.kvm_run->io.port);
			exit(1);

		default:
			fprintf(stderr, "unexpected exit_reason %d\n",
				vcpu.kvm_run->exit_reason);
			exit(1);
		}
	}
}
