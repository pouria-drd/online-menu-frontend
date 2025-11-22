"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import { SendOTPAction } from "@/actions";
import { handleServerError } from "@/lib/utils";
import { sendOTPSchema } from "@/lib/validations";
import { OTPType, SendOTPFormData } from "@/types";

function useSendOTPForm(otpType: OTPType) {
	// Router
	const [otpSent, setOTPSent] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// translations
	const tForm = useTranslations("Forms.SendOTPForm");
	const tVal = useTranslations("Validations.OTPSchema");

	// Send OTP login form and validation schema
	const schema = sendOTPSchema(tVal);

	const sendOTPForm = useForm<SendOTPFormData>({
		resolver: zodResolver(schema),
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
	async function handleSubmit(data: SendOTPFormData) {
		setIsSubmitting(true);
		try {
			const response = await SendOTPAction(data, otpType);

			if (!response.success) {
				setOTPSent(false);

				handleServerError<SendOTPFormData>({
					statusCode: response.statusCode,
					errors: response.errors,
					setError: sendOTPForm.setError,
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
		sendOTPForm,
		handleSubmit,
	};
}

export default useSendOTPForm;
