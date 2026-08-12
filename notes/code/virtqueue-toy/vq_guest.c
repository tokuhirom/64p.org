#include <stddef.h>
#include <stdint.h>

#define NOTIFY_PORT 0xE8

static void outb(uint16_t port, uint8_t value) {
	asm("outb %0,%1" : /* empty */ : "a" (value), "Nd" (port) : "memory");
}

void
__attribute__((noreturn))
__attribute__((section(".start")))
_start(void) {
	volatile char *buf = (volatile char *) 0x1000;
	volatile uint32_t *lenp = (volatile uint32_t *) 0x2000;
	const char *msg =
		"Hello via a toy virtqueue! One doorbell, not one exit per byte.\n";
	uint32_t i = 0;

	/* Fill the "descriptor buffer" in shared guest memory. No VM exit
	   happens here at all -- this is plain memory access. */
	while (msg[i]) {
		buf[i] = msg[i];
		i++;
	}
	*lenp = i;

	/* Ring the doorbell exactly once, no matter how long the message
	   was. Contrast with the earlier kvm-hello-world experiment, which
	   did one outb() -- one VM exit -- PER CHARACTER. */
	outb(NOTIFY_PORT, 1);

	*(long *) 0x400 = 42;
	for (;;)
		asm("hlt" : /* empty */ : "a" (42) : "memory");
}
