<script lang="ts">
	interface Props {
		icon: string;
		title: string;
		description: string;
	}

	const { icon, title, description }: Props = $props();
</script>

<div
	class="flex flex-col gap-4 rounded-xl border-border-primary bg-bg-card p-8 transition-colors hover:text-spotify-green"
>
	<div class="text-4xl">
		{icon}
	</div>
	<h3 class="text-xl font-semibold">
		{title}
	</h3>
	<p class="text-text-secondary">
		{description}
	</p>
</div>
