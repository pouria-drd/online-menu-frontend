import { z } from "zod";
import { Translator } from "@/types";

export const sendOTPSchema = (t: Translator) => {
	return z.object({
		email: z.email({ error: t("email.invalid") }),
	});
};

export const verifyOTPSchema = (t: Translator) => {
	return z.object({
		email: z.email({ error: t("email.invalid") }),

		code: z.string().min(6, t("code.invalid")),
	});
};
