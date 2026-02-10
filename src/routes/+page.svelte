<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Features from '$lib/components/Features.svelte';
	import HowItWorks from '$lib/components/HowItWorks.svelte';
	import Commands from '$lib/components/Commands.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Listenfy - Track Your Server's Spotify Stats</title>
	<meta
		name="description"
		content="See what your Discord community is listening to with automated weekly stats and personal insights."
	/>
</svelte:head>

<Header />
<main class="flex flex-col gap-4">
	<Hero />
	<Features />
	<HowItWorks />
	<Commands />
</main>
<Footer />
