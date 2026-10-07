<script lang="ts">
	let record: HTMLButtonElement;
	let activePointer: number | null = null;
	let lastPointerAngle = 0;
	let lastPointerTime = 0;
	let angularVelocity = 0;
	let dragDistance = 0;
	let rotation = 0;
	let spin: Animation | undefined;
	let suppressClick = false;

	function pointerAngle(event: PointerEvent) {
		const bounds = record.getBoundingClientRect();
		return Math.atan2(
			event.clientY - (bounds.top + bounds.height / 2),
			event.clientX - (bounds.left + bounds.width / 2)
		);
	}

	function setRotation() {
		record.style.transform = `rotate(${rotation}rad)`;
	}

	function stopSpin() {
		if (!spin) return;

		const matrix = new DOMMatrixReadOnly(getComputedStyle(record).transform);
		rotation = Math.atan2(matrix.b, matrix.a);
		spin.cancel();
		spin = undefined;
		setRotation();
	}

	function spinBy(distance: number, duration: number) {
		stopSpin();
		const target = rotation + distance;

		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			rotation = target;
			setRotation();
			return;
		}

		const animation = record.animate(
			[{ transform: `rotate(${rotation}rad)` }, { transform: `rotate(${target}rad)` }],
			{ duration, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards' }
		);
		spin = animation;
		animation.onfinish = () => {
			rotation = target;
			setRotation();
			animation.cancel();
			if (spin === animation) spin = undefined;
		};
	}

	function handlePointerDown(event: PointerEvent) {
		if (event.button !== 0) return;

		suppressClick = false;
		stopSpin();
		activePointer = event.pointerId;
		lastPointerAngle = pointerAngle(event);
		lastPointerTime = event.timeStamp;
		angularVelocity = 0;
		dragDistance = 0;
		record.setPointerCapture(event.pointerId);
	}

	function handlePointerMove(event: PointerEvent) {
		if (event.pointerId !== activePointer) return;

		const angle = pointerAngle(event);
		let delta = angle - lastPointerAngle;
		if (delta > Math.PI) delta -= Math.PI * 2;
		if (delta < -Math.PI) delta += Math.PI * 2;

		const elapsed = event.timeStamp - lastPointerTime;
		if (elapsed > 0) angularVelocity = delta / elapsed;
		rotation += delta;
		dragDistance += Math.abs(delta);
		lastPointerAngle = angle;
		lastPointerTime = event.timeStamp;
		setRotation();
	}

	function finishPointer(event: PointerEvent, cancelled = false) {
		if (event.pointerId !== activePointer) return;
		activePointer = null;
		if (event.timeStamp - lastPointerTime > 80) angularVelocity = 0;

		if (!cancelled && dragDistance > 0.08) {
			suppressClick = true;
			const coast =
				Math.sign(angularVelocity) * Math.min(Math.abs(angularVelocity) * 180, Math.PI * 6);
			if (Math.abs(coast) > 0.08) spinBy(coast, 850);
		}
	}

	function handleClick(event: MouseEvent) {
		if (suppressClick && event.detail > 0) {
			suppressClick = false;
			return;
		}
		suppressClick = false;

		spinBy(matchMedia('(prefers-reduced-motion: reduce)').matches ? Math.PI / 2 : Math.PI * 2, 900);
	}
</script>

<div class="flex flex-col items-start gap-6">
	<button
		bind:this={record}
		type="button"
		aria-label="Listenfy record. Drag to spin, or press Enter or Space to spin once."
		onpointerdown={handlePointerDown}
		onpointermove={handlePointerMove}
		onpointerup={finishPointer}
		onpointercancel={(event) => finishPointer(event, true)}
		onclick={handleClick}
		class="relative flex aspect-square w-[min(72vw,275px)] cursor-grab touch-none items-center justify-center rounded-full border-18 border-warning bg-border-primary select-none active:cursor-grabbing md:w-107.5"
	>
		<span
			aria-hidden="true"
			class="pointer-events-none absolute inset-[9%] rounded-full border border-[#eee9df]/20"
		></span>
		<span
			aria-hidden="true"
			class="pointer-events-none absolute inset-[14%] rounded-full border border-[#eee9df]/15"
		></span>
		<div class="flex h-3/10 w-3/10 items-center justify-center rounded-full bg-[#eee9df]">
			<span class="display-type text-[28px] md:text-[42px]">L.</span>
		</div>
	</button>
	<p class="eyebrow">DRAG TO SPIN</p>
</div>
