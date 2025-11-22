"use client";

import { OTPType } from "@/types";
import { Controller } from "react-hook-form";
import { Fragment, useEffect, useEffectEvent, useState } from "react";

import { useSendOTPForm, useVerifyOTPForm } from "@/hooks";
import {
	Button,
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	Input,
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
	Spinner,
} from "@/components/ui";

interface OTPFormProps {
	otpType: OTPType;
}

function OTPForm(props: OTPFormProps) {
	const [email, setEmail] = useState("");
	const [step, setStep] = useState<"send-otp" | "verify-otp">("send-otp");

	const handleOnOTPSent = (email: string) => {
		setEmail(email);
		setStep("verify-otp");
	};

	const handleOnEdit = () => {
		setStep("send-otp");
		setEmail("");
	};

	return (
		<div>
			{step === "send-otp" && (
				<SendOTPForm
					otpType={props.otpType}
					onSuccess={handleOnOTPSent}
				/>
			)}

			{step === "verify-otp" && email && (
				<VerifyOTPForm
					email={email}
					onEdit={handleOnEdit}
					otpType={props.otpType}
				/>
			)}
		</div>
	);
}

export default OTPForm;

interface SendOTPFormProps {
	otpType: OTPType;
	onSuccess: (email: string) => void;
}

function SendOTPForm(props: SendOTPFormProps) {
	const { handleSubmit, isSubmitting, sendOTPForm, otpSent, tForm } =
		useSendOTPForm(props.otpType);

	const onOTPSent = useEffectEvent(() => {
		const email = sendOTPForm.getValues().email;
		props.onSuccess(email);
	});

	useEffect(() => {
		if (otpSent) {
			onOTPSent();
		}
	}, [otpSent]);

	return (
		<form
			id="send-otp-form"
			onSubmit={sendOTPForm.handleSubmit(handleSubmit)}>
			<FieldGroup>
				{/* Email */}
				<Controller
					name="email"
					control={sendOTPForm.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="send-otp-form-email">
								{tForm("fields.email.label")}
							</FieldLabel>
							<Input
								{...field}
								autoFocus
								type="email"
								autoComplete="email"
								id="send-otp-form-email"
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
				form="send-otp-form"
				className="w-full mt-6"
				disabled={isSubmitting}>
				{isSubmitting ? <Spinner /> : tForm("submit")}
			</Button>
		</form>
	);
}

interface VerifyOTPFormProps {
	email: string;
	onEdit: () => void;
	otpType: OTPType;
}

function VerifyOTPForm(props: VerifyOTPFormProps) {
	const { tForm, isSubmitting, verifyOTPForm, handleSubmit } =
		useVerifyOTPForm(props.email, props.otpType);

	return (
		<Fragment>
			<form
				id="verify-otp-form"
				onSubmit={verifyOTPForm.handleSubmit(handleSubmit)}>
				<FieldGroup>
					{/* Email */}
					<Controller
						name="email"
						control={verifyOTPForm.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel
									htmlFor="verify-otp-form-email"
									className="text-muted-foreground">
									{tForm("fields.email.label")}
								</FieldLabel>
								<Input
									{...field}
									disabled
									value={props.email}
									type="email"
									autoComplete="email"
									id="verify-otp-form-email"
									aria-invalid={fieldState.invalid}
									placeholder={tForm(
										"fields.email.placeholder",
									)}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					{/* Code */}
					<Controller
						name="code"
						control={verifyOTPForm.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel>
									{tForm("fields.code.label")}
								</FieldLabel>
								<InputOTP maxLength={6} {...field}>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</FieldGroup>
			</form>

			<div className="space-y-4 mt-6">
				<Button
					type="submit"
					form="verify-otp-form"
					className="w-full "
					disabled={isSubmitting}>
					{isSubmitting ? <Spinner /> : tForm("submit")}
				</Button>

				<Button
					type="button"
					className="w-full"
					variant={"outline"}
					onClick={props.onEdit}>
					{tForm("edit")}
				</Button>
			</div>
		</Fragment>
	);
}
