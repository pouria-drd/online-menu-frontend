"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import { SendOTPLoginFormData } from "@/types";
import { SendOTPLoginAction } from "@/actions";
import { handleServerError } from "@/lib/utils";
import { sendOTPLoginSchema } from "@/lib/validations";

function useSendOTPLoginForm() {
	// Router
	const [otpSent, setOTPSent] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// translations
	const tForm = useTranslations("Forms.SendOTPLoginForm");
	const tVal = useTranslations("Validations.OTPLoginSchema");

	// Send OTP login form and validation schema
	const sendOTPSchema = sendOTPLoginSchema(tVal);

	const sendOTPLoginForm = useForm<SendOTPLoginFormData>({
		resolver: zodResolver(sendOTPSchema),
		defaultValues: {
			email: "",
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
	 * @param data - Form data (email and password)
	 */
	async function handleSubmit(data: SendOTPLoginFormData) {
		setIsSubmitting(true);
		try {
			const response = await SendOTPLoginAction(data);

			if (!response.success) {
				setOTPSent(false);

				handleServerError<SendOTPLoginFormData>({
					statusCode: response.statusCode,
					errors: response.errors,
					setError: sendOTPLoginForm.setError,
					translate: tForm,
					setGlobalError: handleGlobalError,
				});
				return;
			}

			if (response.success) {
				// Show success message
				setOTPSent(true);
				toast.success(tForm("status.success"));
			}
		} catch (error: unknown) {
			setOTPSent(false);

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
		otpSent,
		isSubmitting,
		sendOTPLoginForm,
		handleSubmit,
	};
}

export default useSendOTPLoginForm;
