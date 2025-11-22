"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { SessionType, UserPayload } from "@/types";

// ============================
// Constants
// ============================

const FIFTEEN_MIN = 60 * 15;
const ONE_DAY = 60 * 60 * 24;

// ============================
// Helpers
// ============================

function getDefaultExpiry(type: SessionType): number {
	return type === "rfs" ? ONE_DAY : FIFTEEN_MIN;
}

function calculateMaxAge(
	decodedExp: number | undefined,
	fallback: number,
): number {
	const now = Math.floor(Date.now() / 1000);

	if (decodedExp) {
		const expiresIn = decodedExp - now;
		return Math.max(expiresIn - 5, 0); // expire slightly earlier
	}

	return fallback;
}

// ============================
// Session Management
// ============================

/**
 * Store JWT token as a secure session cookie.
 * @param token - The JWT token to store as a session cookie.
 * @param type - The type of session token to store (acs or rfs).
 */
export async function createSession(
	token: string,
	type: SessionType = "acs",
): Promise<void> {
	const cookieStore = await cookies();
	const decoded = jwtDecode<UserPayload>(token);

	const fallback = getDefaultExpiry(type);
	const maxAge = calculateMaxAge(decoded.exp, fallback);

	cookieStore.set({
		name: type,
		value: token,
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		path: "/",
		maxAge,
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
