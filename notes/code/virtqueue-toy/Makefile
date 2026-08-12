CFLAGS = -Wall -Wextra -O2

.PHONY: run
run: vq_host vq_guest.img
	./vq_host vq_guest.img

vq_host: vq_host.c
	$(CC) $(CFLAGS) -o $@ $^

vq_guest.o: vq_guest.c
	$(CC) $(CFLAGS) -m32 -ffreestanding -fno-pic -c -o $@ $^

vq_guest.img: vq_guest.o guest.ld
	$(LD) -T guest.ld -m elf_i386 vq_guest.o -o $@

.PHONY: clean
clean:
	$(RM) vq_host vq_guest.o vq_guest.img
