<script lang="ts">
	interface Props {
		command: string;
		description: string;
	}

	const { command, description }: Props = $props();
</script>

<div class="flex flex-col gap-2 rounded-lg border-l-4 border-spotify-green bg-bg-card p-6">
	<code class="rounded-sm bg-spotify-green/15 p-1 font-mono text-sm text-spotify-green">
		{command}
	</code>
	<div class="text-text-secondary">
		{description}
	</div>
</div>
