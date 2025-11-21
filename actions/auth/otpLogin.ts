"use server";

import {
	SendOTPLoginFormData,
	SendOTPLoginResponse,
	VerifyOTPLoginFormData,
	VerifyOTPLoginResponse,
} from "@/types";

/**
 * Sends OTP login request
 * @param data - The email to send OTP login to
 * @returns - Send OTP login response
 */
export async function SendOTPLoginAction(
	data: SendOTPLoginFormData,
): Promise<SendOTPLoginResponse> {
	// build api url
	const apiUrl = `${process.env.BASE_API_URL}/authentication/login/send-otp/`;
	// send request
	const response = await fetch(apiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(data),
	});
	// parse response
	const jsonResponse = await response.json();
	const res = jsonResponse as SendOTPLoginResponse;
	// return response
	return {
		...res,
		statusCode: response.status,
	};
}

/**
 * Verifies OTP login
 * @param data - The OTP login data (email and code)
 * @returns - Verify OTP login response
 */
export async function VerifyOTPLoginAction(
	data: VerifyOTPLoginFormData,
): Promise<VerifyOTPLoginResponse> {
	// build api url
	const apiUrl = `${process.env.BASE_API_URL}/authentication/login/verify-otp/`;
	// send request
	const response = await fetch(apiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(data),
	});
	// parse response
	const jsonResponse = await response.json();
	const res = jsonResponse as VerifyOTPLoginResponse;
	// return response
	return {
		...res,
		statusCode: response.status,
	};
}
