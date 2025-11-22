"use server";

import {
	OTPType,
	SendOTPFormData,
	SendOTPResponse,
	VerifyOTPFormData,
	VerifyOTPResponse,
} from "@/types";

/**
 * Sends OTP login request
 * @param data - The email to send OTP login to
 * @returns - Send OTP login response
 */
export async function SendOTPAction(
	data: SendOTPFormData,
	otpType: OTPType,
): Promise<SendOTPResponse> {
	// build api url
	const apiUrl = `${process.env.BASE_API_URL}/authentication/otp/send/`;

	const body = JSON.stringify({
		email: data.email,
		otp_type: otpType,
	});

	// send request
	const response = await fetch(apiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: body,
	});
	// parse response
	const jsonResponse = await response.json();
	const res = jsonResponse as SendOTPResponse;
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
export async function VerifyOTPAction(
	data: VerifyOTPFormData,
	otpType: OTPType,
): Promise<VerifyOTPResponse> {
	// build api url
	const apiUrl = `${process.env.BASE_API_URL}/authentication/otp/${otpType}/`;
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
	const res = jsonResponse as VerifyOTPResponse;
	// return response
	return {
		...res,
		statusCode: response.status,
	};
}
