import z from "zod";
import { ApiResponse, BackendErrors } from "../api";
import { sendOTPSchema, verifyOTPSchema } from "@/lib/validations";

export type OTPType = "login" | "register" | "reset_password" | "verify_email";

export type SendOTPFormData = z.infer<ReturnType<typeof sendOTPSchema>>;

/**
 * Backend error type for send OTP login form
 */
export type SendOTPApiError = BackendErrors<keyof SendOTPFormData & string>;

/**
 * Backend success type for send OTP login API
 */
export interface SendOTPApiSuccess {
	email: string;
}

/**
 * Full API response for send OTP login
 */
export type SendOTPResponse = ApiResponse<
	SendOTPApiSuccess,
	keyof SendOTPFormData & string
>;

/**
 * Form data type inferred from zod schema
 */
export type VerifyOTPFormData = z.infer<ReturnType<typeof verifyOTPSchema>>;

/**
 * Backend error type for verify OTP login form
 */
export type VerifyOTPApiError = BackendErrors<keyof VerifyOTPFormData & string>;

/**
 * Backend success type for verify OTP login API
 */
export interface VerifyOTPApiSuccess {
	access: string;
	refresh: string;
}

/**
 * Full API response for verify OTP login
 */
export type VerifyOTPResponse = ApiResponse<
	VerifyOTPApiSuccess,
	keyof VerifyOTPFormData & string
>;
