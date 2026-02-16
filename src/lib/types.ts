export interface SuccessResponse<T> {
	success: boolean;
	message: string;
	note?: string;
	data: T;
}

export interface OAuthResponse {
	message: string;
	spotifyUser: string;
	discordGuildId: number;
}

export interface ErrorResponse {
	success: boolean;
	message: string;
	errors: ApiError[];
}

export interface ApiError {
	code?: string;
	description?: string;
}

export type CallbackData =
	| { success: true; data: OAuthResponse; message: string }
	| { success: false; message: string; errors?: ApiError[] };
