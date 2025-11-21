import { z } from "zod";
import { loginSchema } from "@/lib/validations";
import { ApiResponse, BackendErrors } from "@/types/api";

/**
 * Form data type inferred from zod schema
 */
export type LoginFormData = z.infer<ReturnType<typeof loginSchema>>;

/**
 * Backend error type for login form
 */
export type LoginApiError = BackendErrors<keyof LoginFormData & string>;

/**
 * Backend success type for login API
 */
export interface LoginApiSuccess {
	access: string;
	refresh: string;
}

/**
 * Full API response for login
 */
export type LoginResponse = ApiResponse<
	LoginApiSuccess,
	keyof LoginFormData & string
>;
