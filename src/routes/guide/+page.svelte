<script lang="ts">
	import { PUBLIC_REDIRECT_URL } from '$env/static/public';
	import GuideCheckItem from '$lib/components/guide/GuideCheckItem.svelte';
	import GuideHero from '$lib/components/guide/GuideHero.svelte';
	import GuideNotice from '$lib/components/guide/GuideNotice.svelte';
	import GuideStep from '$lib/components/guide/GuideStep.svelte';
</script>

<svelte:head>
	<title>Listenfy - Setup Guide</title>
	<meta name="description" content="Setup guide for Listenfy." />
</svelte:head>

<main class="mx-auto flex w-full max-w-225 flex-col gap-4 p-4">
	<GuideHero
		title="Setup Guide"
		subtitle="Follow these steps to connect your Spotify account to Listenfy"
	/>

	<GuideNotice title="Why do I need to create a Spotify app?">
		<p>
			Due to Spotify's API restrictions, each user needs their own Spotify developer application.
			This is a one-time setup that takes about 5 minutes. Don't worry - it's completely free and
			you don't need any coding knowledge!
		</p>
	</GuideNotice>

	<GuideStep step={1} title="Go to Spotify Developer Dashboard">
		<p class="text-text-secondary">
			Open your browser and navigate to the Spotify Developer Dashboard.
		</p>
		<a
			href="https://developer.spotify.com/dashboard"
			target="_blank"
			rel="noreferrer"
			class="w-fit rounded-lg bg-spotify-green px-8 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(29,185,84,0.3)]"
		>
			Open Spotify Dashboard
		</a>
		<p class="text-sm text-text-secondary">
			You'll need to log in with your Spotify account. If you don't have one, you'll need to create
			a Spotify account first <strong>and</strong> get a Premium subscription.
		</p>
	</GuideStep>

	<GuideStep step={2} title="Create a New App">
		<p class="text-text-secondary">
			Once logged in, click the <span class="font-semibold text-white">"Create app"</span>
			button on the dashboard.
		</p>
		<img
			class="w-full rounded-lg border border-border-primary"
			src="https://res.cloudinary.com/dit0zbles/image/upload/t_to_webp/v1771428264/developer.spotify.com_dashboard_zm2i1c.webp"
			alt="Create app button"
		/>
	</GuideStep>

	<GuideStep step={3} title="Fill in App Details">
		<p class="text-text-secondary">Fill in the form with the following information:</p>
		<ul class="flex flex-col gap-2">
			<GuideCheckItem>
				<strong>App name:</strong> Any name you like (e.g., "My Listenfy App")
			</GuideCheckItem>
			<GuideCheckItem>
				<strong>App description:</strong> Any description (e.g., "For Discord stats tracking")
			</GuideCheckItem>
			<GuideCheckItem><strong>Website:</strong> Leave blank or put any URL</GuideCheckItem>
			<GuideCheckItem>
				<strong>Redirect URI:</strong> This is the important one! (see below)
			</GuideCheckItem>
		</ul>
	</GuideStep>

	<GuideStep step={4} title="Add the Redirect URI">
		<p class="text-text-secondary">
			In the <strong>Redirect URI</strong> field, enter exactly this URL (copy/paste recommended):
		</p>
		<div
			class="rounded-lg border border-border-primary bg-command-bg px-4 py-3 font-mono text-sm break-all"
		>
			{PUBLIC_REDIRECT_URL}
		</div>
		<GuideNotice variant="warning">
			<p>
				<strong class="text-warning">⚠️ Important:</strong> The redirect URI must match
				<em>exactly</em>. Make sure there are no:
			</p>
			<ul class="flex list-disc flex-col gap-1 pl-6 text-sm text-text-secondary">
				<li>Extra spaces before or after</li>
				<li>Trailing slashes at the end</li>
				<li>Different protocols (http vs https)</li>
			</ul>
		</GuideNotice>
		<p class="text-text-secondary">
			Then check the box for <strong>"Web API"</strong> under "Which API/SDKs are you planning to use?"
		</p>
	</GuideStep>

	<GuideStep step={5} title="Save and Get Your Client ID">
		<p class="text-text-secondary">
			Click <strong>"Save"</strong> to create your app. You'll be taken to your app's settings page.
		</p>
		<p class="text-text-secondary">
			Click on <strong>"Settings"</strong> in the top right, then find your
			<strong>Client ID</strong>. It looks something like this:
		</p>
		<div
			class="rounded-lg border border-border-primary bg-command-bg px-4 py-3 font-mono text-sm break-all"
		>
			a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
		</div>
		<p class="text-text-secondary">
			Click the <strong>"Copy"</strong> button next to your Client ID to copy it to your clipboard.
		</p>
		<GuideNotice variant="warning">
			<p>
				<strong class="text-warning">Note:</strong> You do NOT need the Client Secret. Only copy the Client
				ID.
			</p>
		</GuideNotice>

		<img
			class="w-full rounded-lg border border-border-primary"
			src="https://res.cloudinary.com/dit0zbles/image/upload/t_to_webp/v1771428269/developer.spotify.com_dashboard_6853e5f8771b4ba79f52d87d6ef08ab9_bmlmsg.webp"
			alt="Create app button"
		/>
	</GuideStep>

	<GuideStep step={6} title="Connect in Discord">
		<p class="text-text-secondary">Now go back to Discord and run the command:</p>
		<div class="rounded-lg border border-border-primary bg-command-bg px-4 py-3 font-mono text-sm">
			/connect
		</div>
		<p class="text-text-secondary">
			The bot will send you a link. Click it and paste your Client ID when prompted. That's it!
		</p>

		<img
			class="w-full rounded-lg border border-border-primary"
			src="https://res.cloudinary.com/dit0zbles/image/upload/t_to_webp/v1771428462/localhost_5173_connect_token_xxx_yobfec.webp"
			alt="Create app button"
		/>
	</GuideStep>

	<GuideStep step={7} title="You're All Set! 🎉">
		<p class="text-text-secondary">Once connected, you can:</p>
		<ul class="flex flex-col gap-2">
			<GuideCheckItem>
				Use
				<span class="rounded bg-command-bg px-2 py-0.5 font-mono text-sm text-spotify-green">
					/stats
				</span>
				to view your listening history
			</GuideCheckItem>
			<GuideCheckItem>Participate in weekly server stats</GuideCheckItem>
			<GuideCheckItem>
				Disconnect anytime with
				<span class="rounded bg-command-bg px-2 py-0.5 font-mono text-sm text-spotify-green">
					/disconnect
				</span>
			</GuideCheckItem>
		</ul>
	</GuideStep>
</main>
