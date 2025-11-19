"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { LoginFormData } from "@/types";
import { handleServerError } from "@/lib/utils";
import { loginSchema } from "@/lib/validations";
import { createSession, loginAction } from "@/actions";

function useLoginForm() {
	// Router
	const router = useRouter();
	const searchParams = useSearchParams();
	const next = searchParams.get("next");

	const [isSubmitting, setIsSubmitting] = useState(false);

	// translations
	const tForm = useTranslations("Forms.LoginForm");
	const tVal = useTranslations("Validations.LoginSchema");

	// form and validation schema
	const schema = loginSchema(tVal);

	const loginForm = useForm<LoginFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	/**
	 * Handles global form errors
	 * @param msg - error message
	 */
	function handleGlobalError(msg: string) {
		toast.error(msg);
	}

	/**
	 * Handles login form submission
	 * @param data - Form data (username and password)
	 */
	async function handleSubmit(data: LoginFormData) {
		setIsSubmitting(true);
		try {
			const response = await loginAction(data);

			if (!response.success) {
				if (response.statusCode === 429) {
					handleGlobalError(tForm("status.too_many_requests"));
					return;
				}

				handleServerError<LoginFormData>(
					response.errors,
					loginForm.setError,
					tForm,
					handleGlobalError,
				);
				return;
			}

			if (response.success) {
				// Show success message
				toast.success(tForm("status.success"));
				// Save access and refresh tokens
				await createSession(response.result.access, "acs");
				await createSession(response.result.refresh, "rfs");
				// Reset form
				loginForm.reset();
				// Redirect to dashboard page or next link
				const redirectTo = next ?? "/panel/user";
				router.push(redirectTo as "/");
			}
		} catch (error: unknown) {
			if (process.env.NODE_ENV === "development") {
				console.error("Error[useLoginForm]:", error);
			}

			handleGlobalError(tForm("status.failed"));
		} finally {
			setIsSubmitting(false);
		}
	}

	return {
		tForm,
		loginForm,
		handleSubmit,
		isSubmitting,
	};
}

export default useLoginForm;
