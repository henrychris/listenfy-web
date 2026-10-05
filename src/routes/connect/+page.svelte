<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { PUBLIC_REDIRECT_URL } from '$env/static/public';

	let clientId = $state('');
	let loading = $state(false);
	let error = $state('');
	let token = $derived(page.url.searchParams.get('token') ?? '');

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
		const id = clientId.trim();
		if (!id) {
			error = 'Enter the Client ID from your Spotify app.';
			return;
		}

		if (!token) {
			return;
		}

		loading = true;
		error = '';

		try {
			const { codeVerifier, codeChallenge } = await generatePKCE();

			// Store in sessionStorage temporarily
			sessionStorage.setItem('pkce_verifier', codeVerifier);
			sessionStorage.setItem('oauth_state', token);
			sessionStorage.setItem('client_id', id);

			// Redirect to Spotify
			const params = new URLSearchParams({
				client_id: id,
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

<svelte:head>
	<title>Listenfy — Connect Spotify</title>
</svelte:head>

<main
	class="mx-auto flex min-h-[calc(100svh-85px)] max-w-360 flex-col gap-10 px-6 py-12 md:px-15.5 md:py-12.5"
>
	{#if token}
		<section class="flex max-w-3xl flex-col gap-5">
			<p class="eyebrow">CONNECT SPOTIFY / STEP 2 OF 3</p>
			<h1 class="display-type text-5xl leading-[1.08] md:text-7xl md:leading-18.75">
				Enter your Spotify Client ID.
			</h1>
			<p class="text-lg leading-8 md:text-[21px] md:leading-8.25">
				Paste the Client ID from your Spotify developer app. Then you’ll approve the connection on
				Spotify.
			</p>
		</section>

		<form
			onsubmit={handleConnect}
			class="flex max-w-2xl flex-col gap-4 border border-border-primary p-5 md:p-6"
		>
			<label for="clientId" class="eyebrow">SPOTIFY CLIENT ID</label>
			<input
				id="clientId"
				name="clientId"
				autocomplete="off"
				type="text"
				bind:value={clientId}
				placeholder="Paste your Client ID"
				disabled={loading}
				class="border-2 border-border-primary bg-transparent p-4 text-base placeholder:text-text-secondary disabled:opacity-50"
			/>
			{#if error}<p role="alert" class="font-semibold text-warning">{error}</p>{/if}
			<button
				type="submit"
				disabled={loading}
				class="bg-warning px-5 py-4 text-left font-bold text-white hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{loading ? 'Opening Spotify…' : 'Continue to Spotify →'}
			</button>
			<p class="text-sm leading-6">
				Need help finding your Client ID? <a
					href={resolve('/guide')}
					class="font-semibold underline decoration-warning underline-offset-4"
					>Follow the setup guide</a
				>.
			</p>
		</form>
	{:else}
		<section role="alert" class="flex max-w-3xl flex-col gap-5 border-t-3 border-warning pt-5">
			<p class="eyebrow">CONNECTION LINK NEEDED</p>
			<h1 class="display-type text-5xl leading-[1.08] md:text-7xl md:leading-18.75">
				Start in Discord.
			</h1>
			<p class="text-lg leading-8 md:text-[21px] md:leading-8.25">
				This page needs a link from Listenfy before you can enter your Client ID. In your Discord
				server, run <code class="command">/connect</code> and open the link it sends you.
			</p>
			<p class="text-base leading-7">
				Already used a link? Run <code class="command">/connect</code> again for a fresh one.
			</p>
			<a
				href={resolve('/guide')}
				class="w-fit font-semibold underline decoration-warning underline-offset-4"
				>See the full setup guide →</a
			>
		</section>
	{/if}
</main>
