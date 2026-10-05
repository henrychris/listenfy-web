<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import './layout.css';

	let { children } = $props();
</script>

<div class="flex min-h-svh flex-col">
	<Header />
	<div class="flex flex-1 flex-col">{@render children()}</div>
	<Footer />
</div>
