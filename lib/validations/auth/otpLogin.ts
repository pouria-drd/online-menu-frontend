import { z } from "zod";
import { Translator } from "@/types";

export const sendOTPLoginSchema = (t: Translator) => {
	return z.object({
		email: z.email({ error: t("email.invalid") }),
	});
};

export const verifyOTPLoginSchema = (t: Translator) => {
	return z.object({
		email: z.email({ error: t("email.invalid") }),

		code: z.string().min(6, t("code.invalid")),
	});
};
