<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { PUBLIC_REDIRECT_URL } from '$env/static/public';

	let clientId = $state('');
	let loading = $state(false);
	let error = $state('');
	let token = $state('');

	onMount(() => {
		// Get the state token from URL
		token = page.url.searchParams.get('token') || '';

		if (!token) {
			error = 'Invalid connection link. Please use /connect in Discord to get a new link.';
		}
	});

	function base64urlEncode(array: Uint8Array) {
		return btoa(String.fromCharCode(...array))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=/g, '');
	}

	async function generatePKCE(): Promise<{
		codeVerifier: string;
		codeChallenge: string;
	}> {
		// Generate code verifier
		const array = new Uint8Array(64);
		crypto.getRandomValues(array);
		const codeVerifier = base64urlEncode(array);

		// Generate code challenge
		const encoder = new TextEncoder();
		const data = encoder.encode(codeVerifier);
		const digest = await crypto.subtle.digest('SHA-256', data);
		const codeChallenge = base64urlEncode(new Uint8Array(digest));

		return { codeVerifier, codeChallenge };
	}

	async function handleConnect(e: SubmitEvent) {
		e.preventDefault();
		if (!clientId.trim()) {
			error = 'Please enter your Spotify Client ID';
			return;
		}

		if (clientId.length !== 32) {
			error = 'Client ID should be 32 characters long';
			return;
		}

		if (!token) {
			error = 'Invalid connection link. Please use /connect in Discord.';
			return;
		}

		loading = true;
		error = '';

		try {
			const { codeVerifier, codeChallenge } = await generatePKCE();

			// Store in sessionStorage temporarily
			sessionStorage.setItem('pkce_verifier', codeVerifier);
			sessionStorage.setItem('oauth_state', token);
			sessionStorage.setItem('client_id', clientId);

			// Redirect to Spotify
			const params = new URLSearchParams({
				client_id: clientId,
				response_type: 'code',
				redirect_uri: PUBLIC_REDIRECT_URL,
				scope: 'user-read-recently-played user-read-private',
				state: token,
				code_challenge: codeChallenge,
				code_challenge_method: 'S256'
			});

			window.location.href = `https://accounts.spotify.com/authorize?${params}`;
		} catch (err) {
			loading = false;
			error = 'Failed to generate authorization link. Please try again.';
			console.error(err);
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center p-4">
	<div class="flex max-w-125 flex-col gap-6 rounded-xl border border-border-primary bg-bg-card p-8">
		<div class="flex flex-col gap-1 text-center">
			<h1 class="text-2xl font-bold">Connect Your Spotify</h1>
			<p class="text-text-secondary">Enter your Spotify Client ID to continue</p>
		</div>

		<div
			class="rounded-lg border-l-4 border-spotify-green bg-spotify-green/15 p-4 text-sm text-text-secondary"
		>
			Don't have a Client ID yet?
			<a href="/guide" target="_blank" class="text-spotify-green hover:underline">
				Follow our setup guide →
			</a>
		</div>

		{#if error}
			<div class="rounded-lg border-l-4 border-red-500 bg-red-500/15 p-4 text-sm text-red-400">
				{error}
			</div>
		{/if}

		<form onsubmit={handleConnect} class="flex flex-col gap-6">
			<div class="flex flex-col gap-2">
				<label for="clientId" class="text-sm font-semibold">Spotify Client ID</label>
				<input
					id="clientId"
					type="text"
					bind:value={clientId}
					placeholder="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
					disabled={loading || !token}
					class="w-full rounded-lg border border-border-primary bg-command-bg p-4 font-mono text-base text-white placeholder:text-[#666] focus:border-spotify-green focus:outline-none disabled:opacity-50"
				/>
				<p class="text-sm text-text-secondary">
					Find this in your Spotify Developer Dashboard under Settings
				</p>
			</div>

			<button
				type="submit"
				disabled={loading || !token}
				class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-spotify-green p-4 text-base font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{#if loading}
					<span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
					></span>
				{/if}
				{loading ? 'Connecting...' : 'Continue to Spotify'}
			</button>
		</form>
	</div>
</div>
