<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'info' | 'warning';
		title?: string;
		children: Snippet;
	}

	const { variant = 'info', title, children }: Props = $props();

	const isWarning = $derived(variant === 'warning');
	const containerClass = $derived(
		isWarning
			? 'border-[#faa61a] bg-[rgb(250_166_26_/0.1)]'
			: 'border-spotify-green bg-[rgb(29_185_84_/0.1)]'
	);
	const titleClass = $derived(isWarning ? 'text-[#faa61a]' : 'text-spotify-green');
	const bodyClass = $derived(isWarning ? 'flex flex-col gap-2' : 'text-text-secondary');
</script>

<section class={`flex flex-col gap-2 rounded-lg border-l-4 p-6 ${containerClass}`}>
	{#if title}
		<h2 class={`text-lg font-semibold ${titleClass}`}>{title}</h2>
	{/if}
	<div class={bodyClass}>
		{@render children()}
	</div>
</section>
