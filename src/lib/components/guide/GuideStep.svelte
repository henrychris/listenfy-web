<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		step: number;
		title: string;
		children: Snippet;
	}

	const { step, title, children }: Props = $props();
</script>

<section class="flex flex-col gap-6 rounded-xl border border-border-primary bg-bg-card p-8">
	<div class="flex items-center gap-4">
		<div
			class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-discord-blurple to-spotify-green text-lg font-bold"
		>
			{step}
		</div>
		<h2 class="text-2xl font-semibold">{title}</h2>
	</div>
	{@render children()}
</section>
