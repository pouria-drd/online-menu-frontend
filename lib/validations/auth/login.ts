import { z } from "zod";
import { Translator } from "@/types";

const loginSchema = (t: Translator) => {
	return z.object({
		username: z
			.string(t("username.required"))
			.min(3, t("username.min"))
			.max(100, t("username.max", { max: 100 })),

		password: z.string(t("password.required")),
	});
};

export default loginSchema;
