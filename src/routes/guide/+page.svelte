<script lang="ts">
	import { PUBLIC_REDIRECT_URL } from '$env/static/public';

	let copyState = $state<'idle' | 'copied' | 'error'>('idle');
	let resetTimer: ReturnType<typeof setTimeout>;

	async function copyRedirectUri() {
		clearTimeout(resetTimer);
		try {
			await navigator.clipboard.writeText(PUBLIC_REDIRECT_URL);
			copyState = 'copied';
		} catch {
			copyState = 'error';
		}
		resetTimer = setTimeout(() => (copyState = 'idle'), 1500);
	}
</script>

<svelte:head>
	<title>Listenfy — Setup Guide</title>
	<meta
		name="description"
		content="Create your Spotify app, copy its Client ID, and connect it to Listenfy."
	/>
</svelte:head>

<main class="mx-auto min-h-[calc(100svh-85px)] max-w-360">
	<aside class="border-t-3 border-warning px-6 py-5 md:px-15">
		<p class="eyebrow">BEFORE YOU START / SPOTIFY PREMIUM</p>
		<p class="mt-2 max-w-5xl text-base leading-7">
			You need an active Spotify Premium subscription to create the app used for this connection.
			Listenfy only asks for the app’s Client ID.
		</p>
	</aside>

	<div class="px-6 py-8 md:px-15 md:py-12">
		<p class="eyebrow">THE PRACTICAL EDITION / 01–06</p>
		<h1 class="display-type mt-5 max-w-4xl text-[40px] leading-11.25 md:text-7xl md:leading-19.5">
			Set up Spotify for Listenfy.
		</h1>
		<p class="mt-5 max-w-3xl text-lg leading-8">
			Spotify asks you to create a developer app before you connect. Follow these steps once. You
			won’t need to write code.
		</p>

		<ol class="mt-10 border-t border-border-primary">
			<li class="grid gap-3 border-b border-border-primary py-7 sm:grid-cols-[58px_1fr]">
				<span class="text-xl font-extrabold text-warning">01</span>
				<div class="max-w-3xl">
					<h2 class="text-xl font-bold">Open the Spotify Developer Dashboard</h2>
					<p class="mt-2 leading-7">Sign in with your Premium Spotify account.</p>
					<a
						href="https://developer.spotify.com/dashboard"
						target="_blank"
						rel="noreferrer"
						class="mt-4 inline-block bg-warning px-5 py-3 font-bold text-white hover:bg-[#7e4b2f]"
						>Open Spotify Dashboard ↗</a
					>
				</div>
			</li>

			<li class="grid gap-3 border-b border-border-primary py-7 sm:grid-cols-[58px_1fr]">
				<span class="text-xl font-extrabold text-warning">02</span>
				<div class="max-w-3xl">
					<h2 class="text-xl font-bold">Create your app</h2>
					<p class="mt-2 leading-7">
						Click <strong>Create app</strong>. Give it any name and short description, such as “My
						Listenfy connection.” Select <strong>Web API</strong> when Spotify asks which API you’ll use.
					</p>
				</div>
			</li>

			<li class="grid gap-3 border-b border-border-primary py-7 sm:grid-cols-[58px_1fr]">
				<span class="text-xl font-extrabold text-warning">03</span>
				<div class="max-w-4xl min-w-0">
					<h2 class="text-xl font-bold">Add the Redirect URI</h2>
					<p class="mt-2 leading-7">
						Find the <strong>Redirect URIs</strong> field in Spotify. Copy the address below and paste
						it exactly. If you already created the app, add it in your app’s Settings.
					</p>
					<div class="mt-4 bg-bg-card p-5">
						<p class="eyebrow">REDIRECT URI / COPY EXACTLY</p>
						<code class="mt-3 block font-mono text-sm leading-6 break-all md:text-lg"
							>{PUBLIC_REDIRECT_URL}</code
						>
						<button
							type="button"
							onclick={copyRedirectUri}
							class="mt-4 border border-border-primary px-4 py-2 font-bold hover:bg-[#d4c7b6]"
							>{copyState === 'copied' ? 'Copied' : 'Copy URI'}</button
						>
						<p aria-live="polite" class="mt-2 text-sm leading-6">
							{#if copyState === 'copied'}
								Paste it into Spotify’s Redirect URIs field.
							{:else if copyState === 'error'}
								Copy failed. Select the address above and copy it manually.
							{:else}
								The address must match exactly, including the ending <code>/callback</code>.
							{/if}
						</p>
					</div>
				</div>
			</li>

			<li class="grid gap-3 border-b border-border-primary py-7 sm:grid-cols-[58px_1fr]">
				<span class="text-xl font-extrabold text-warning">04</span>
				<div class="max-w-3xl">
					<h2 class="text-xl font-bold">Save the app and copy its Client ID</h2>
					<p class="mt-2 leading-7">
						Accept Spotify’s developer terms and create or save the app. Open its
						<strong>Settings</strong> and copy the <strong>Client ID</strong>. Leave the Client
						Secret private; you won’t enter it on Listenfy.
					</p>
				</div>
			</li>

			<li class="grid gap-3 border-b border-border-primary py-7 sm:grid-cols-[58px_1fr]">
				<span class="text-xl font-extrabold text-warning">05</span>
				<div class="max-w-3xl">
					<h2 class="text-xl font-bold">Return to Discord</h2>
					<p class="mt-2 leading-7">
						Run <code class="command">/connect</code> in your Discord server and open the new link Listenfy
						sends you. Paste your Client ID into the Listenfy page.
					</p>
				</div>
			</li>

			<li class="grid gap-3 border-b border-border-primary py-7 sm:grid-cols-[58px_1fr]">
				<span class="text-xl font-extrabold text-warning">06</span>
				<div class="max-w-3xl">
					<h2 class="text-xl font-bold">Approve the connection on Spotify</h2>
					<p class="mt-2 leading-7">
						Choose <strong>Continue to Spotify</strong>, then approve access. When Listenfy says
						“You’re connected,” return to Discord. Your first stats may take a few minutes.
					</p>
				</div>
			</li>
		</ol>

		<p class="mt-8 max-w-4xl text-lg leading-8">
			Once stats are ready, use <code class="command">/personalstats</code> for your listening or
			<code class="command">/serverstats</code> for the server. An admin can use
			<code class="command">/setchannel</code> to choose where weekly posts appear.
		</p>
	</div>
</main>
