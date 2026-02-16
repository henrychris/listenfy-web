import { API_BASE_URL } from '$env/static/private';
import type { CallbackData, ErrorResponse, OAuthResponse, SuccessResponse } from '$lib/types';

export const load = async ({ url, fetch }) => {
	console.log('[Callback] Load function called');
	console.log('[Callback] Full URL:', url.href);
	
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const error = url.searchParams.get('error');

	console.log(
		'[Callback] Params - code:',
		code ? `${code.substring(0, 10)}...` : 'null',
		'state:',
		state,
		'error:',
		error
	);

	// If there's an error parameter, return immediately
	if (error) {
		console.log('[Callback] Error parameter present, returning error response');
		return {
			success: false,
			message: 'Authorization failed',
			errors: [{ description: error }]
		} satisfies CallbackData;
	}

	// If no code or state, return error
	if (!code || !state) {
		console.log('[Callback] Missing required parameters');
		return {
			success: false,
			message: 'Missing required parameters',
			errors: [{ description: 'Authorization code or state is missing' }]
		} satisfies CallbackData;
	}

	try {
		const apiUrl = `${API_BASE_URL}/spotify/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`;
		console.log('[Callback] Calling backend API:', API_BASE_URL);
		console.log('[Callback] Full API URL:', apiUrl);
		
		// Call the backend API with the query parameters
		const response = await fetch(apiUrl);

		console.log('[Callback] Backend response status:', response.status, response.statusText);
		
		if (response.ok) {
			const result: SuccessResponse<OAuthResponse> = await response.json();
			console.log('[Callback] Success response received:', result.message);
			return {
				success: true,
				data: result.data,
				message: result.message
			} satisfies CallbackData;
		} else {
			const errorResult: ErrorResponse = await response.json();
			console.log('[Callback] Error response from backend:', errorResult.message);
			console.log('[Callback] Errors:', errorResult.errors);
			return {
				success: false,
				message: errorResult.message,
				errors: errorResult.errors
			} satisfies CallbackData;
		}
	} catch (err) {
		console.error('[Callback] Exception caught:', err);
		console.error('[Callback] Error stack:', err instanceof Error ? err.stack : 'No stack trace');
		return {
			success: false,
			message: 'Failed to connect to server',
			errors: [{ description: err instanceof Error ? err.message : 'Unknown error occurred' }]
		} satisfies CallbackData;
	}
};
