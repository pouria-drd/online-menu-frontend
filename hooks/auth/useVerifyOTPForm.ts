"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useEffectEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { handleServerError } from "@/lib/utils";
import { verifyOTPSchema } from "@/lib/validations";
import { OTPType, VerifyOTPFormData } from "@/types";
import { createSession, VerifyOTPAction } from "@/actions";

function useVerifyOTForm(email: string, otpType: OTPType) {
	// Router
	const router = useRouter();
	const searchParams = useSearchParams();
	const next = searchParams.get("next");

	const [isSubmitting, setIsSubmitting] = useState(false);

	// translations
	const tForm = useTranslations("Forms.VerifyOTPForm");
	const tVal = useTranslations("Validations.OTPSchema");

	// Verify OTP login form and validation schema
	const schema = verifyOTPSchema(tVal);

	const verifyOTPForm = useForm<VerifyOTPFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
			code: "",
		},
	});

	const onEmailChange = useEffectEvent(() => {
		verifyOTPForm.reset({ email, code: "" });
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
	async function handleSubmit(data: VerifyOTPFormData) {
		setIsSubmitting(true);
		try {
			const response = await VerifyOTPAction(data, otpType);

			if (!response.success) {
				handleServerError<VerifyOTPFormData>({
					statusCode: response.statusCode,
					errors: response.errors,
					setError: verifyOTPForm.setError,
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
				verifyOTPForm.reset();
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
		verifyOTPForm,
		handleSubmit,
	};
}

export default useVerifyOTForm;
