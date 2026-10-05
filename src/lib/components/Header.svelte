<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<header class="border-b border-border-primary">
	<div
		class="mx-auto flex w-full max-w-360 items-center justify-between px-6 py-4 md:px-14.5 md:py-6.25"
	>
		<a
			href={resolve('/')}
			class="text-[22px] leading-7 font-extrabold tracking-tight no-underline md:text-[27px] md:leading-8.5"
			>listenfy</a
		>
		<nav aria-label="Main navigation" class="flex items-center gap-5 text-sm md:gap-8 md:text-base">
			<a class="transition-colors hover:text-warning" href={resolve('/guide')}
				><span class="sm:hidden">Guide</span><span class="hidden sm:inline">Guide</span></a
			>
		</nav>
	</div>
</header>
