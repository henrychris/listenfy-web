import posthog from 'posthog-js';
import { browser, dev } from '$app/environment';
import {
	PUBLIC_POSTHOG_KEY,
	PUBLIC_POSTHOG_HOST,
	PUBLIC_POSTHOG_UI_HOST
} from '$env/static/public';

export const load = async () => {
	if (browser && !dev) {
		posthog.init(PUBLIC_POSTHOG_KEY, {
			api_host: PUBLIC_POSTHOG_HOST,
			ui_host: PUBLIC_POSTHOG_UI_HOST,
			defaults: '2026-01-30'
		});
	}

	return;
};
