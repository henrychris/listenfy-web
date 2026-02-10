<script lang="ts">
	const steps = [
		{
			number: 1,
			title: 'Add Bot',
			description: 'Invite Listenfy to your Discord server'
		},
		{
			number: 2,
			title: 'Set Channel',
			description: 'Use /setchannel to pick where stats are posted'
		},
		{
			number: 3,
			title: 'Connect Spotify',
			description: 'Members use /connect to link their accounts'
		},
		{
			number: 4,
			title: 'Enjoy Stats',
			description: 'Get weekly summaries and check personal stats anytime'
		}
	];
</script>

<section class="flex flex-col gap-12 bg-bg-card p-12">
	<h2 class="text-center text-4xl font-bold text-text-primary md:text-5xl">How It Works</h2>
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
		{#each steps as step (step.number)}
			<div class="flex flex-col items-center gap-4 text-center">
				<div
					class="gradient flex h-12 w-12 items-center justify-center rounded-full text-2xl font-bold"
				>
					{step.number}
				</div>
				<h3 class="text-xl font-semibold text-text-primary">
					{step.title}
				</h3>
				<p class="text-text-secondary">
					{step.description}
				</p>
			</div>
		{/each}
	</div>
</section>
