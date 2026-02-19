<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { PUBLIC_API_BASE_URL, PUBLIC_REDIRECT_URL } from '$env/static/public';

	let status = 'loading'; // 'loading' | 'success' | 'error'
	let errorMessage = '';
	let errorType = '';

	const errorMessages: Record<string, string> = {
		access_denied:
			'You declined the Spotify authorization request. To use Listenfy, you need to grant access to your Spotify listening data.',
		invalid_state:
			'This authorization link is invalid or has already been used. Please use /connect in Discord to generate a new link.',
		state_mismatch:
			'The authorization state could not be verified. This might be a security issue. Please try connecting again.',
		token_exchange_failed:
			"We received your authorization but couldn't complete the connection with Spotify. Please try again.",
		unknown: 'An unexpected error occurred while connecting your Spotify account. Please try again.'
	};

	onMount(async () => {
		const urlParams = page.url.searchParams;
		const code = urlParams.get('code');
		const state = urlParams.get('state');
		const error = urlParams.get('error');

		// Check for explicit error from Spotify
		if (error) {
			status = 'error';
			errorType = error;
			errorMessage = errorMessages[error] || errorMessages['unknown'];
			return;
		}

		// Check for required parameters
		if (!code || !state) {
			status = 'error';
			errorType = 'invalid_state';
			errorMessage = errorMessages['invalid_state'];
			return;
		}

		// Get stored PKCE values
		const codeVerifier = sessionStorage.getItem('pkce_verifier');
		const savedState = sessionStorage.getItem('oauth_state');
		const clientId = sessionStorage.getItem('client_id');

		// Verify state matches
		if (state !== savedState) {
			status = 'error';
			errorType = 'state_mismatch';
			errorMessage = errorMessages['state_mismatch'];
			clearSession();
			return;
		}

		if (!codeVerifier || !clientId) {
			status = 'error';
			errorType = 'invalid_state';
			errorMessage = 'Missing authentication data. Please try connecting again from Discord.';
			clearSession();
			return;
		}

		try {
			// Send to backend to complete OAuth
			const response = await fetch(`${PUBLIC_API_BASE_URL}/spotify/oauth/complete`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					code,
					codeVerifier,
					clientId,
					state
				})
			});

			const data = await response.json();
			if (response.ok) {
				status = 'success';
				clearSession();

				// Auto-close after 5 seconds if popup
				if (window.opener) {
					setTimeout(() => {
						window.close();
					}, 5000);
				}
			} else {
				status = 'error';
				errorType = data.error || 'unknown';
				errorMessage = data.message || errorMessages[errorType] || errorMessages['unknown'];
			}
		} catch (err) {
			status = 'error';
			errorType = 'token_exchange_failed';
			errorMessage = 'Failed to connect to the server. Please try again.';
			console.error(err);
		}
	});

	function clearSession() {
		sessionStorage.removeItem('pkce_verifier');
		sessionStorage.removeItem('oauth_state');
		sessionStorage.removeItem('client_id');
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-bg-dark p-8">
	<div
		class="w-full max-w-2xl rounded-2xl border border-border-primary bg-bg-card p-12 text-center"
	>
		{#if status === 'loading'}
			<div
				class="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border-4 border-discord-blurple/30 bg-command-bg"
			>
				<svg
					class="h-10 w-10 animate-spin text-discord-blurple"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			</div>
			<h1 class="mb-4 text-3xl font-bold">Connecting...</h1>
			<p class="text-lg text-text-secondary">
				Please wait while we complete your Spotify connection.
			</p>
		{:else if status === 'success'}
			<div
				class="gradient animate-scale-in mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-spotify-green/30 text-5xl"
			>
				✓
			</div>
			<h1 class="mb-4 text-3xl font-bold text-spotify-green">Spotify Connected!</h1>
			<p class="mb-8 text-lg text-text-secondary">
				Your Spotify account has been successfully linked to Listenfy. You're all set!
			</p>

			<div class="mb-8 flex flex-col gap-4 rounded-xl bg-spotify-green/5 p-6 text-left">
				<div class="flex items-start gap-3">
					<span class="shrink-0 text-2xl">📊</span>
					<span class="text-text-secondary">
						Use <span class="font-semibold text-white">/stats</span> in Discord to see your listening
						history
					</span>
				</div>
				<div class="flex items-start gap-3">
					<span class="shrink-0 text-2xl">📅</span>
					<span class="text-text-secondary">Participate in weekly server stats summaries</span>
				</div>
				<div class="flex items-start gap-3">
					<span class="shrink-0 text-2xl">🔓</span>
					<span class="text-text-secondary">
						Disconnect anytime with <span class="font-semibold text-white">/disconnect</span>
					</span>
				</div>
			</div>

			<div class="flex flex-wrap justify-center gap-4">
				<a
					href="discord://-"
					class="rounded-lg bg-discord-blurple px-8 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(117,0,247,0.3)]"
				>
					Return to Discord
				</a>
				<a
					href="/"
					class="rounded-lg border-2 border-text-secondary bg-transparent px-8 py-3 font-semibold text-text-secondary transition-all hover:bg-white/5"
				>
					Back to Home
				</a>
			</div>

			<p class="mt-8 text-sm text-[#666]">
				You can safely close this window and return to Discord.
			</p>
		{:else if status === 'error'}
			<div
				class="animate-shake mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-500 text-5xl text-white"
			>
				✕
			</div>
			<h1 class="mb-4 text-3xl font-bold text-red-400">Connection Failed</h1>
			<p class="mb-8 text-lg text-text-secondary">{errorMessage}</p>

			{#if errorType && errorType !== 'access_denied'}
				<div class="mb-8 rounded-lg border-l-4 border-red-500 bg-red-500/10 p-4 text-left">
					<div class="font-mono text-sm text-red-400">Error: {errorType}</div>
				</div>
			{/if}

			<div class="mb-8 flex flex-col gap-4 rounded-xl bg-white/5 p-6 text-left">
				<h3 class="text-lg font-semibold">Try these solutions:</h3>
				<div class="flex items-start gap-3">
					<span
						class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-discord-blurple text-sm font-bold"
						>1</span
					>
					<span class="text-text-secondary">
						Go back to Discord and use <span class="font-semibold text-white">/connect</span> to get a
						fresh link
					</span>
				</div>
				<div class="flex items-start gap-3">
					<span
						class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-discord-blurple text-sm font-bold"
						>2</span
					>
					<span class="text-text-secondary">
						Make sure you clicked "Agree" on the Spotify authorization page
					</span>
				</div>
				<div class="flex items-start gap-3">
					<span
						class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-discord-blurple text-sm font-bold"
						>3</span
					>
					<span class="text-text-secondary">
						Verify your Client ID is correct and your app's redirect URI is set to:
						<span class="font-semibold break-all text-white">{PUBLIC_REDIRECT_URL}</span>
					</span>
				</div>
				<div class="flex items-start gap-3">
					<span
						class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-discord-blurple text-sm font-bold"
						>4</span
					>
					<span class="text-text-secondary"
						>Try using a different browser if the issue persists</span
					>
				</div>
			</div>

			<div class="flex flex-wrap justify-center gap-4">
				<a
					href="discord://-"
					class="rounded-lg bg-discord-blurple px-8 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(117,0,247,0.3)]"
				>
					Return to Discord
				</a>
				<a
					href="/"
					class="rounded-lg border-2 border-text-secondary bg-transparent px-8 py-3 font-semibold text-text-secondary transition-all hover:bg-white/5"
				>
					Back to Home
				</a>
			</div>
		{/if}
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
