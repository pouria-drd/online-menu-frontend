"use client";

import Link from "next/link";
import { Controller } from "react-hook-form";

import { useLoginForm } from "@/hooks";
import { AppLogo } from "@/components/images";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
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
		<Card className="w-full sm:max-w-xs">
			<CardHeader className="flex flex-col items-center justify-center text-center">
				<AppLogo />
				<CardTitle>{tForm("title")}</CardTitle>
				<CardDescription>{tForm("description")}</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					id="login-form"
					onSubmit={loginForm.handleSubmit(handleSubmit)}>
					<FieldGroup>
						{/* Username */}
						<Controller
							name="username"
							control={loginForm.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="login-form-username">
										{tForm("fields.username.label")}
									</FieldLabel>
									<Input
										{...field}
										autoFocus
										autoComplete="off"
										id="login-form-username"
										aria-invalid={fieldState.invalid}
										placeholder={tForm(
											"fields.username.placeholder",
										)}
									/>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
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
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>

			<CardFooter className="flex-col gap-4">
				<Button
					type="submit"
					form="login-form"
					className="w-full"
					disabled={isSubmitting}>
					{isSubmitting ? <Spinner /> : tForm("submit")}
				</Button>

				<Link
					href={"/auth/register"}
					className="text-muted-foreground text-sm">
					{tForm("message")}
					<Button variant={"link"} className="p-0 mx-1">
						{tForm("register")}
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}

export default LoginForm;
