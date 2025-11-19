"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { SessionType, UserPayload } from "@/types";

/**
 * Create a session cookie from a JWT token
 * @param token - The JWT token to create a session cookie from
 * @param type - The type of session token to create (acs or rfs)
 */
export async function createSession(
	token: string,
	type: SessionType = "acs",
): Promise<void> {
	const decoded = jwtDecode<UserPayload>(token);

	// Calculate remaining lifetime (in seconds)
	const now = Math.floor(Date.now() / 1000);
	const expiresIn = decoded.exp ? decoded.exp - now : 60 * 60 * 24; // fallback to 1 day

	// Prevent negative maxAge in case token already expired
	const maxAge = Math.max(expiresIn - 5, 0); // expire 5s earlier just in case token is expired

	const cookieStore = await cookies();

	cookieStore.set({
		name: type,
		value: token,
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		maxAge, // dynamically set from token exp
	});
}

/**
 * Get the session cookie from the request headers
 * @returns The session cookie from the request headers
 */
export async function getSession(): Promise<string | null> {
	try {
		// Get the tokens cookie from the request headers
		const cookieStore = await cookies();

		const refreshToken = cookieStore.get("rfs")?.value;
		const accessToken = cookieStore.get("acs")?.value;

		// if the refreshToken is not set, return null
		if (!refreshToken) {
			return null;
		}

		if (accessToken) {
			return accessToken;
		} else {
			const apiUrl = `${process.env.BASE_API_URL}/authentication/refresh/`;

			const response = await fetch(apiUrl, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ refresh: refreshToken }),
			});

			if (!response.ok) {
				return null;
			}

			const jsonResponse = await response.json();
			const refreshedAccessToken = jsonResponse.access;

			return refreshedAccessToken;
		}
	} catch (error: unknown) {
		if (process.env.NODE_ENV === "development") {
			console.error("[getSession]", error);
		}
		return null;
	}
}

/**
 * Delete the session cookie
 */
export async function clearSession(): Promise<void> {
	const cookieStore = await cookies();

	cookieStore.delete("acs");
	cookieStore.delete("rfs");
}
