<script lang="ts">
	import { onMount } from 'svelte';

	interface SuccessProps {
		spotifyUser?: string;
		message?: string;
	}

	let { spotifyUser, message }: SuccessProps = $props();

	onMount(() => {
		// Auto-close after 5 seconds if opened in popup
		if (window.opener) {
			setTimeout(() => {
				window.close();
			}, 5000);
		}
	});
</script>

<div class="mx-auto w-full max-w-150 p-8 text-center sm:p-4">
	<div class="rounded-2xl border border-spotify-green/30 bg-bg-card p-12 sm:p-8">
		<div
			class="gradient animate-scale-in mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full text-5xl"
		>
			✓
		</div>

		<h1 class="mb-4 text-3xl font-bold text-spotify-green sm:text-2xl">Spotify Connected!</h1>

		<p class="mb-8 text-lg leading-relaxed text-text-secondary sm:text-base">
			{message || "Your Spotify account has been successfully linked to Listenfy. You're all set!"}
		</p>

		{#if spotifyUser}
			<p class="-mt-4 mb-6 text-base text-text-primary">
				Connected as: <strong>{spotifyUser}</strong>
			</p>
		{/if}

		<div class="my-8 rounded-lg bg-spotify-green/5 p-6 text-left">
			<div class="mb-4 flex items-start gap-3">
				<span class="shrink-0 text-xl">📊</span>
				<span class="text-text-secondary"
					>Use <strong>/personalstats</strong> in Discord to see your listening history</span
				>
			</div>
			<div class="mb-4 flex items-start gap-3">
				<span class="shrink-0 text-xl">📅</span>
				<span class="text-text-secondary">Participate in weekly server stats summaries</span>
			</div>
			<div class="flex items-start gap-3">
				<span class="shrink-0 text-xl">🔓</span>
				<span class="text-text-secondary">Disconnect anytime with <strong>/disconnect</strong></span
				>
			</div>
		</div>

		<div class="mt-8 flex flex-wrap justify-center gap-4 sm:flex-col">
			<a
				href="discord://-"
				class="inline-block rounded-lg bg-discord-blurple px-8 py-4 font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(117,0,247,0.3)]"
			>
				Return to Discord
			</a>
			<a
				href="/"
				class="inline-block rounded-lg border-2 border-text-secondary bg-transparent px-8 py-4 font-semibold text-text-secondary no-underline transition-all duration-200 hover:bg-white/5 sm:w-full"
			>
				Back to Home
			</a>
		</div>

		<p class="mt-8 text-sm text-text-secondary">
			You can safely close this window and return to Discord.
		</p>
	</div>
</div>

<style>
	@keyframes scale-in {
		from {
			transform: scale(0);
		}
		to {
			transform: scale(1);
		}
	}

	.animate-scale-in {
		animation: scale-in 0.5s ease;
	}
</style>
