"use client";

import { Controller } from "react-hook-form";
import { useEffect, useEffectEvent } from "react";

import { useSendOTPLoginForm } from "@/hooks";
import {
	Button,
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	Input,
	Spinner,
} from "@/components/ui";

interface Props {
	onSuccess: (email: string) => void;
}

function SendOTPLogin(props: Props) {
	const { handleSubmit, isSubmitting, sendOTPLoginForm, otpSent, tForm } =
		useSendOTPLoginForm();

	const onOTPSent = useEffectEvent(() => {
		const email = sendOTPLoginForm.getValues().email;
		props.onSuccess(email);
	});

	useEffect(() => {
		if (otpSent) {
			onOTPSent();
		}
	}, [otpSent]);

	return (
		<form
			id="send-otp-login-form"
			onSubmit={sendOTPLoginForm.handleSubmit(handleSubmit)}>
			<FieldGroup>
				{/* Email */}
				<Controller
					name="email"
					control={sendOTPLoginForm.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="send-otp-login-form-email">
								{tForm("fields.email.label")}
							</FieldLabel>
							<Input
								{...field}
								autoFocus
								type="email"
								autoComplete="email"
								id="send-otp-login-form-email"
								aria-invalid={fieldState.invalid}
								placeholder={tForm("fields.email.placeholder")}
							/>
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>
			</FieldGroup>

			<Button
				type="submit"
				form="send-otp-login-form"
				className="w-full mt-6"
				disabled={isSubmitting}>
				{isSubmitting ? <Spinner /> : tForm("submit")}
			</Button>
		</form>
	);
}

export default SendOTPLogin;
