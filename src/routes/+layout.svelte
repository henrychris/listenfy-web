<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';import favicon from '$lib/assets/favicon.ico';
	import './layout.css';

	let { children } = $props();
</script>
<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Header />
{@render children()}
<Footer />
