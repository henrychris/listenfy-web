<script lang="ts">
	import CallbackSuccess from '$lib/components/CallbackSuccess.svelte';
	import CallbackError from '$lib/components/CallbackError.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.success ? 'Spotify Connected' : 'Connection Failed'} - Listenfy</title>
	<meta
		name="description"
		content={data.success
			? 'Your Spotify account has been successfully connected to Listenfy'
			: 'Failed to connect your Spotify account'}
	/>
</svelte:head>

<div class="flex min-h-screen items-center justify-center p-8 sm:p-4">
	{#if data.success}
		<CallbackSuccess spotifyUser={data.data?.spotifyUser} message={data.message} />
	{:else}
		<CallbackError message={data.message} errors={data.errors} />
	{/if}
</div>
