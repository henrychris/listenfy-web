import posthog from 'posthog-js';
import { browser, dev } from '$app/environment';
import { POSTHOG_KEY } from '$env/static/private';

export const load = async () => {
	if (browser && !dev) {
		posthog.init(POSTHOG_KEY, {
			api_host: 'https://us.i.posthog.com',
			defaults: '2026-01-30'
		});
	}

	return;
};
