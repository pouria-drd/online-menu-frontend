"use server";

import { LoginFormData, LoginResponse } from "@/types";

async function loginAction(data: LoginFormData): Promise<LoginResponse> {
	const apiUrl = `${process.env.BASE_API_URL}/authentication/login/`;

	const response = await fetch(apiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(data),
	});

	const jsonResponse = await response.json();

	const res = jsonResponse as LoginResponse;
	return {
		...res,
		statusCode: response.status,
	};
}

export default loginAction;
