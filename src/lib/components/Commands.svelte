<script lang="ts">
	import CommandItem from './CommandItem.svelte';

	const commands = [
		{
			command: '/connect',
			description: 'Connect your Spotify account to this server'
		},
		{
			command: '/disconnect',
			description: 'Disconnect your Spotify account and remove your data'
		},
		{
			command: '/stats',
			description: 'View your personal listening stats for the past week'
		},
		{
			command: '/setchannel',
			description: 'Set the channel for weekly stats (Admin only)'
		}
	];
</script>

<section class="mx-auto flex w-full max-w-4xl flex-col gap-12 p-12">
	<h2 class="text-center text-4xl font-bold text-text-primary md:text-5xl">Commands</h2>
	<div class="mx-auto flex w-full max-w-2xl flex-col gap-4">
		{#each commands as cmd (cmd.command)}
			<CommandItem command={cmd.command} description={cmd.description} />
		{/each}
	</div>
</section>
