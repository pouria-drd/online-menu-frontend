"use client";

import { Controller } from "react-hook-form";

import { useLoginForm } from "@/hooks";
import {
	Button,
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	Input,
	Spinner,
} from "@/components/ui";

function LoginForm() {
	const { tForm, loginForm, handleSubmit, isSubmitting } = useLoginForm();

	return (
		<form id="login-form" onSubmit={loginForm.handleSubmit(handleSubmit)}>
			<FieldGroup>
				{/* Email */}
				<Controller
					name="email"
					control={loginForm.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="login-form-email">
								{tForm("fields.email.label")}
							</FieldLabel>
							<Input
								{...field}
								autoFocus
								type="email"
								autoComplete="email"
								id="login-form-email"
								aria-invalid={fieldState.invalid}
								placeholder={tForm("fields.email.placeholder")}
							/>
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>

				{/* Password */}
				<Controller
					name="password"
					control={loginForm.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="login-form-password">
								{tForm("fields.password.label")}
							</FieldLabel>
							<Input
								{...field}
								type="password"
								autoComplete="off"
								id="login-form-password"
								aria-invalid={fieldState.invalid}
								placeholder={tForm(
									"fields.password.placeholder",
								)}
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
				form="login-form"
				className="w-full mt-6"
				disabled={isSubmitting}>
				{isSubmitting ? <Spinner /> : tForm("submit")}
			</Button>
		</form>
	);
}

export default LoginForm;
