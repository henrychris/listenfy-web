import { API_BASE_URL } from '$env/static/private';
import type { CallbackData, ErrorResponse, OAuthResponse, SuccessResponse } from '$lib/types';

export const load = async ({ url, fetch }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const error = url.searchParams.get('error');

	// If there's an error parameter, return immediately
	if (error) {
		return {
			success: false,
			message: 'Authorization failed',
			errors: [{ description: error }]
		} satisfies CallbackData;
	}

	// If no code or state, return error
	if (!code || !state) {
		return {
			success: false,
			message: 'Missing required parameters',
			errors: [{ description: 'Authorization code or state is missing' }]
		} satisfies CallbackData;
	}

	try {
		// Call the backend API with the query parameters
		const response = await fetch(
			`${API_BASE_URL}/spotify/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`
		);
		if (response.ok) {
			const result: SuccessResponse<OAuthResponse> = await response.json();
			return {
				success: true,
				data: result.data,
				message: result.message
			} satisfies CallbackData;
		} else {
			const errorResult: ErrorResponse = await response.json();
			return {
				success: false,
				message: errorResult.message,
				errors: errorResult.errors
			} satisfies CallbackData;
		}
	} catch (err) {
		return {
			success: false,
			message: 'Failed to connect to server',
			errors: [{ description: err instanceof Error ? err.message : 'Unknown error occurred' }]
		} satisfies CallbackData;
	}
};
