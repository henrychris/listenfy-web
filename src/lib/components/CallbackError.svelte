<script lang="ts">
	import { onMount } from 'svelte';
	import type { ApiError } from '$lib/types';

	interface Props {
		message?: string;
		errors?: ApiError[];
	}

	let { message, errors }: Props = $props();

	onMount(() => {
		// Auto-close after 10 seconds if opened in popup
		if (window.opener) {
			setTimeout(() => {
				window.close();
			}, 10000);
		}
	});
</script>

<div class="mx-auto w-full max-w-150 p-8 text-center sm:p-4">
	<div class="rounded-2xl border border-red-500/30 bg-bg-card p-12 sm:p-8">
		<div
			class="animate-shake mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#ed4245] text-5xl text-white"
		>
			✕
		</div>

		<h1 class="mb-4 text-3xl font-bold text-[#ed4245] sm:text-2xl">Connection Failed</h1>

		<p class="error-message mb-8 text-lg leading-relaxed text-text-secondary sm:text-base">
			{message || "We couldn't connect your Spotify account. This could be due to several reasons."}
		</p>

		{#if errors && errors.length > 0}
			<div class="my-8 rounded border-l-4 border-[#ed4245] bg-[#ed4245]/10 p-4 text-left">
				{#each errors as error, index (index)}
					<div class="font-mono text-sm text-[#ed4245] {index < errors.length - 1 ? 'mb-2' : ''}">
						{#if error.code}
							<strong>{error.code}:</strong>
						{/if}
						{error.description || 'Unknown error'}
					</div>
				{/each}
			</div>
		{/if}

		<div class="my-8 rounded-lg bg-white/5 p-6 text-left">
			<h3 class="mb-4 text-lg font-semibold text-text-primary">Try these solutions:</h3>
			<div class="mb-4 flex items-start gap-3">
				<span
					class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-discord-blurple text-[0.85rem] font-bold"
					>1</span
				>
				<span class="text-text-secondary"
					>Go back to Discord and use <strong>/connect</strong> to get a fresh link</span
				>
			</div>
			<div class="mb-4 flex items-start gap-3">
				<span
					class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-discord-blurple text-[0.85rem] font-bold"
					>2</span
				>
				<span class="text-text-secondary"
					>Make sure you clicked "Agree" on the Spotify authorization page</span
				>
			</div>
			<div class="mb-4 flex items-start gap-3">
				<span
					class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-discord-blurple text-[0.85rem] font-bold"
					>3</span
				>
				<span class="text-text-secondary">Try using a different browser if the issue persists</span>
			</div>
			<div class="flex items-start gap-3">
				<span
					class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-discord-blurple text-[0.85rem] font-bold"
				>
					4
				</span>
				<span class="text-text-secondary">
					Contact the developer if you continue to experience issues
				</span>
			</div>
		</div>

		<div class="mt-8 flex flex-wrap justify-center gap-4 sm:flex-col">
			<a
				href="https://discord.com/channels/@me"
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
	</div>
</div>

<style>
	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-10px);
		}
		75% {
			transform: translateX(10px);
		}
	}

	.animate-shake {
		animation: shake 0.5s ease;
	}
</style>
