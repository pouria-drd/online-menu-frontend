import { createSession, getSession } from "@/actions";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
	// Redirect to login page if the user is not authenticated
	const redirectUrl = new URL("/auth/login", request.url);
	// Preserve the original URL in the 'next' parameter
	redirectUrl.searchParams.set("next", request.url);

	try {
		// Check if the user is authenticated
		const session = await getSession();

		// Redirect to login if the user is not authenticated
		if (!session) {
			return NextResponse.redirect(redirectUrl, { status: 303 });
		}

		// Create a new session for the proxied request
		await createSession(session, "acs");

		// Allow the request to proceed if all checks pass
		return NextResponse.next();
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error during middleware:", error);
		}
		return NextResponse.redirect(redirectUrl, { status: 303 });
	}
}

// Apply middleware to specific routes only
export const config = {
	matcher: ["/panel/:path*"],
};
