<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Features from '$lib/components/Features.svelte';
	import HowItWorks from '$lib/components/HowItWorks.svelte';
	import Commands from '$lib/components/Commands.svelte';
</script>

<svelte:head>
	<title>Listenfy - Track Your Server's Spotify Stats</title>
	<meta
		name="description"
		content="See what your Discord community is listening to with automated weekly stats and personal insights."
	/>
</svelte:head>

<main class="flex flex-col gap-4">
	<Hero />
	<Features />
	<HowItWorks />
	<Commands />
</main>
