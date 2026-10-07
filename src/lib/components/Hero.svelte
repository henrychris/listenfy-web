<script lang="ts">
	import { resolve } from '$app/paths';
	import { PUBLIC_DISCORD_CLIENT_ID } from '$env/static/public';
	import RecordDisc from './RecordDisc.svelte';

	const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${PUBLIC_DISCORD_CLIENT_ID}&permissions=277025540096&scope=bot%20applications.commands`;
</script>

<section
	class="mx-auto grid max-w-360 items-start gap-8 px-6 py-7 md:grid-cols-2 md:gap-16.25 md:px-15.5 md:py-12.5"
>
	<div class="flex min-w-0 flex-col items-start gap-6">
		<p class="eyebrow font-normal tracking-[0.16em]">ISSUE 01 / A SERVER IN SONGS</p>
		<h1
			class="display-type max-w-155 text-[40px] leading-11.25 font-bold md:text-[69px] md:leading-18"
		>
			The week sounds better together.
		</h1>
		<p class="max-w-155 text-lg leading-7 md:text-[23px] md:leading-8.25">
			Listenfy is a Discord bot. Members connect Spotify; the bot tracks recently played music and
			shares personal stats, top tracks, top artists, and server recaps.
		</p>
		<a
			href={inviteUrl}
			target="_blank"
			rel="noreferrer"
			class="inline-block bg-warning px-6 py-4 font-bold text-white hover:bg-[#7e4b2f]"
			>Add to Discord</a
		>
		<div
			class="w-full border-t border-border-primary pt-4.5 text-[15px] leading-6.25 md:text-[17px] md:leading-6.75"
		>
			<a href={resolve('/guide')} class="hover:underline">Setup guide</a>
			<p>
				Start in Discord → run <code class="command">/connect</code> → authorize Spotify → ask
				<code class="command">/personalstats</code> or
				<code class="command">/serverstats</code>.
			</p>
		</div>
	</div>

	<div class="flex min-w-0 flex-col items-start gap-6">
		<RecordDisc />
		<div class="w-full text-[15px] leading-6.25 md:text-[19px] md:leading-7.25">
			<p>EXAMPLE WEEKLY RECAP / #AFTERHOURS</p>
			<p>01 @henry · 1,248 min · top track: Pink + White — Frank Ocean (42 plays)</p>
			<p>02 @abena · 1,006 min · top track: BIRDS OF A FEATHER — Billie Eilish (36 plays)</p>
		</div>
	</div>
</section>
