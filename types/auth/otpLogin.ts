import { z } from "zod";
import { ApiResponse, BackendErrors } from "@/types/api";
import { sendOTPLoginSchema, verifyOTPLoginSchema } from "@/lib/validations";

/**
 * Form data type inferred from zod schema
 */
export type SendOTPLoginFormData = z.infer<
	ReturnType<typeof sendOTPLoginSchema>
>;

/**
 * Backend error type for send OTP login form
 */
export type SendOTPLoginApiError = BackendErrors<
	keyof SendOTPLoginFormData & string
>;

/**
 * Backend success type for send OTP login API
 */
export interface SendOTPLoginApiSuccess {
	email: string;
}

/**
 * Full API response for send OTP login
 */
export type SendOTPLoginResponse = ApiResponse<
	SendOTPLoginApiSuccess,
	keyof SendOTPLoginFormData & string
>;

/**
 * Form data type inferred from zod schema
 */
export type VerifyOTPLoginFormData = z.infer<
	ReturnType<typeof verifyOTPLoginSchema>
>;

/**
 * Backend error type for verify OTP login form
 */
export type VerifyOTPLoginApiError = BackendErrors<
	keyof VerifyOTPLoginFormData & string
>;

/**
 * Backend success type for verify OTP login API
 */
export interface VerifyOTPLoginApiSuccess {
	access: string;
	refresh: string;
}

/**
 * Full API response for verify OTP login
 */
export type VerifyOTPLoginResponse = ApiResponse<
	VerifyOTPLoginApiSuccess,
	keyof VerifyOTPLoginFormData & string
>;
