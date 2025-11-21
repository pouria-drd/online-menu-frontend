"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useEffectEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { VerifyOTPLoginFormData } from "@/types";
import { handleServerError } from "@/lib/utils";
import { verifyOTPLoginSchema } from "@/lib/validations";
import { createSession, VerifyOTPLoginAction } from "@/actions";

function useVerifyOTPLogin(email: string) {
	// Router
	const router = useRouter();
	const searchParams = useSearchParams();
	const next = searchParams.get("next");

	const [isSubmitting, setIsSubmitting] = useState(false);

	// translations
	const tForm = useTranslations("Forms.VerifyOTPLoginForm");
	const tVal = useTranslations("Validations.OTPLoginSchema");

	// Verify OTP login form and validation schema
	const verifyOTPSchema = verifyOTPLoginSchema(tVal);

	const verifyOTPLoginForm = useForm<VerifyOTPLoginFormData>({
		resolver: zodResolver(verifyOTPSchema),
		defaultValues: {
			email: "",
			code: "",
		},
	});

	const onEmailChange = useEffectEvent(() => {
		verifyOTPLoginForm.reset({ email, code: "" });
	});

	useEffect(() => {
		if (email) {
			onEmailChange();
		}
	}, [email]);

	/**
	 * Handles global form errors
	 * @param msg - error message
	 */
	function handleGlobalError(msg: string) {
		toast.error(msg);
	}

	/**
	 * Handles login form submission
	 * @param data - Form data (email and password)
	 */
	async function handleSubmit(data: VerifyOTPLoginFormData) {
		setIsSubmitting(true);
		try {
			const response = await VerifyOTPLoginAction(data);

			if (!response.success) {
				handleServerError<VerifyOTPLoginFormData>({
					statusCode: response.statusCode,
					errors: response.errors,
					setError: verifyOTPLoginForm.setError,
					translate: tForm,
					setGlobalError: handleGlobalError,
				});
				return;
			}

			if (response.success) {
				// Show success message
				toast.success(tForm("status.success"));

				// Save access and refresh tokens
				await createSession(response.result.access, "acs");
				await createSession(response.result.refresh, "rfs");
				// Reset form
				verifyOTPLoginForm.reset();
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
		isSubmitting,
		verifyOTPLoginForm,
		handleSubmit,
	};
}

export default useVerifyOTPLogin;
