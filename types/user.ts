export type UserRole = "admin" | "user";

export type SessionType = "acs" | "rfs";

export interface UserPayload {
	iss?: string | undefined;
	sub?: string | undefined;
	aud?: string | string[] | undefined;
	exp?: number | undefined;
	nbf?: number | undefined;
	iat?: number | undefined;
	jti?: string | undefined;
	id: string;
	role: UserRole;
}
