import z from "zod";
import { ApiResponse } from "../api";
import { loginSchema } from "@/lib/validations";

interface LoginApiSuccess {
	username: string;
	access: string;
	refresh: string;
}

interface LoginApiError {
	username: string;
	password: string;
}

export type LoginFormData = z.infer<ReturnType<typeof loginSchema>>;

export type LoginResponse = ApiResponse<LoginApiSuccess, LoginApiError>;
