<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';

	let status = 'loading';
	let errorType = '';
	let errorMessage = '';

	onMount(async () => {
		const params = page.url.searchParams;
		const code = params.get('code');
		const state = params.get('state');
		const spotifyError = params.get('error');

		if (spotifyError) {
			errorType = spotifyError;
			status = 'error';
			return;
		}
		if (!code || !state) {
			errorType = 'invalid_state';
			status = 'error';
			return;
		}

		const codeVerifier = sessionStorage.getItem('pkce_verifier');
		const savedState = sessionStorage.getItem('oauth_state');
		const clientId = sessionStorage.getItem('client_id');
		if (state !== savedState || !codeVerifier || !clientId) {
			errorType = 'invalid_state';
			status = 'error';
			clearSession();
			return;
		}

		try {
			const response = await fetch(`${PUBLIC_API_BASE_URL}/spotify/oauth/complete`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ code, codeVerifier, clientId, state })
			});
			const data = await response.json().catch(() => ({}));
			if (response.ok) {
				status = 'success';
				clearSession();
				if (window.opener) setTimeout(() => window.close(), 5000);
			} else {
				errorType = data.error || 'connection_failed';
				errorMessage = data.message || '';
				status = 'error';
			}
		} catch (err) {
			errorType = 'connection_failed';
			errorMessage = 'Could not reach Listenfy. Check your connection and try again.';
			status = 'error';
			console.error(err);
		}
	});

	function clearSession() {
		sessionStorage.removeItem('pkce_verifier');
		sessionStorage.removeItem('oauth_state');
		sessionStorage.removeItem('client_id');
	}
</script>

<svelte:head><title>Listenfy — Spotify Connection</title></svelte:head>

<main class="mx-auto min-h-[calc(100svh-85px)] max-w-360 px-6 py-12 md:px-15.5 md:py-13">
	{#if status === 'loading'}
		<section class="flex max-w-3xl flex-col gap-6" aria-live="polite">
			<p class="eyebrow">CONNECT SPOTIFY / STEP 3 OF 3</p>
			<h1 class="display-type text-5xl leading-[1.08] md:text-7xl md:leading-18.75">
				Connecting your account…
			</h1>
			<p class="text-lg leading-8 md:text-[21px] md:leading-8.25">
				Spotify sent you back to Listenfy. We’re finishing the connection now. Keep this page open
				for a moment.
			</p>
			<p class="border-t-3 border-warning pt-4 font-semibold" role="status">
				Waiting for confirmation from Listenfy…
			</p>
		</section>
	{:else if status === 'success'}
		<section class="flex max-w-3xl flex-col gap-6" aria-live="polite">
			<p class="eyebrow">CONNECTION COMPLETE</p>
			<h1 class="display-type text-5xl leading-[1.08] md:text-7xl md:leading-18.75">
				You’re connected.
			</h1>
			<p class="text-lg leading-8 md:text-[21px] md:leading-8.25">
				Your Spotify account is connected to Listenfy. You can close this page and return to
				Discord. Look for a confirmation in your DMs; your first stats may take a few minutes.
			</p>
			<div class="border-t-3 border-warning pt-4 text-base leading-7">
				<p class="font-bold">What can I do next?</p>
				<p>
					In Discord, run <code class="command">/personalstats</code> to see your listening or
					<code class="command">/serverstats</code> to see the server’s.
				</p>
			</div>
		</section>
	{:else}
		<section class="flex max-w-3xl flex-col gap-6" role="alert">
			<p class="eyebrow">CONNECTION NOT COMPLETED</p>
			{#if errorType === 'access_denied'}
				<h1 class="display-type text-5xl leading-[1.08] md:text-7xl md:leading-18.75">
					Spotify access wasn’t approved.
				</h1>
				<p class="text-lg leading-8 md:text-[21px] md:leading-8.25">
					Nothing was connected. To try again, run <code class="command">/connect</code> in Discord, open
					the new link, and approve access on Spotify.
				</p>
			{:else if errorType === 'invalid_state' || errorType === 'state_mismatch'}
				<h1 class="display-type text-5xl leading-[1.08] md:text-7xl md:leading-18.75">
					This link can’t be used.
				</h1>
				<p class="text-lg leading-8 md:text-[21px] md:leading-8.25">
					The connection could not be verified. Return to Discord, run <code class="command"
						>/connect</code
					>, and open the new link in the same browser.
				</p>
			{:else}
				<h1 class="display-type text-5xl leading-[1.08] md:text-7xl md:leading-18.75">
					We couldn’t finish connecting.
				</h1>
				<p class="text-lg leading-8 md:text-[21px] md:leading-8.25">
					Return to Discord and run <code class="command">/connect</code> for a new link. If it
					happens again, check your Client ID and Redirect URI in the
					<a
						href={resolve('/guide')}
						class="font-semibold underline decoration-warning underline-offset-4">setup guide</a
					>.
				</p>
			{/if}
			<p class="border-t-3 border-warning pt-4 text-base leading-7">
				You can close this page now. This attempt did not confirm a connection.
			</p>
			{#if errorMessage}<details class="text-sm text-text-secondary">
					<summary class="cursor-pointer">Technical details</summary>
					<p class="mt-2 break-words">{errorMessage}</p>
				</details>{/if}
		</section>
	{/if}
</main>
