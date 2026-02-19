<script lang="ts">
	interface Props {
		title: string;
		subtitle: string;
	}

	const { title, subtitle }: Props = $props();
</script>

<section class="flex flex-col gap-4">
	<h1 class="text-4xl font-semibold">{title}</h1>
	<p class="text-lg text-text-secondary">{subtitle}</p>
</section>
