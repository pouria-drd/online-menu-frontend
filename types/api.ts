export interface ApiSuccess<T> {
	success: true;
	message: string;
	result: T;
}

export interface ApiError<E> {
	success: false;
	message: string;
	errors: E;
}

export type ApiResponse<T, E> = ApiSuccess<T> | ApiError<E>;
