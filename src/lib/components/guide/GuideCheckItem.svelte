<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<li class="flex items-start gap-3">
	<span class="text-lg font-bold text-spotify-green">✓</span>
	<span>{@render children()}</span>
</li>
