"use client";

import { Fragment } from "react";
import { Controller } from "react-hook-form";

import { useVerifyOTPLogin } from "@/hooks";
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

interface Props {
	email: string;
	onEdit: () => void;
}

function VerifyOTPLogin(props: Props) {
	const { tForm, isSubmitting, verifyOTPLoginForm, handleSubmit } =
		useVerifyOTPLogin(props.email);

	return (
		<Fragment>
			<form
				id="verify-otp-login-form"
				onSubmit={verifyOTPLoginForm.handleSubmit(handleSubmit)}>
				<FieldGroup>
					{/* Email */}
					<Controller
						name="email"
						control={verifyOTPLoginForm.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel
									htmlFor="verify-otp-login-form-email"
									className="text-muted-foreground">
									{tForm("fields.email.label")}
								</FieldLabel>
								<Input
									{...field}
									disabled
									value={props.email}
									type="email"
									autoComplete="email"
									id="verify-otp-login-form-email"
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
						control={verifyOTPLoginForm.control}
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
					form="verify-otp-login-form"
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

export default VerifyOTPLogin;
