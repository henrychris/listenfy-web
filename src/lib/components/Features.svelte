<script lang="ts">
	import FeatureCard from './FeatureCard.svelte';

	const features = [
		{
			icon: '📊',
			title: 'Weekly Stats',
			description:
				'Automated weekly summaries posted to your chosen channel showing top tracks and artists.'
		},
		{
			icon: '👤',
			title: 'Personal Insights',
			description:
				'Check your own stats anytime with the /stats command. See your top 5 tracks and artists.'
		},
		{
			icon: '⚡',
			title: 'Easy Setup',
			description:
				'Get started in minutes. Just add the bot, set a channel, and connect your Spotify.'
		}
	];
</script>

<section class="flex flex-col gap-12 p-12">
	<h2 class="text-center text-4xl font-bold text-text-primary md:text-5xl">Features</h2>
	<div class="flex flex-col gap-8 lg:flex-row lg:justify-between">
		{#each features as feature (feature.title)}
			<FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
		{/each}
	</div>
</section>
