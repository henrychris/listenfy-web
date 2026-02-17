import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		paths: {
			relative: false // Required for PostHog session replay to work correctly
		}
	}
};

export default config;
