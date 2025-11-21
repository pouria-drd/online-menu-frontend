import { z } from "zod";
import { Translator } from "@/types";

const loginSchema = (t: Translator) => {
	return z.object({
		email: z.email({ error: t("email.invalid") }),

		password: z.string().min(1, t("password.required")),
	});
};

export default loginSchema;
