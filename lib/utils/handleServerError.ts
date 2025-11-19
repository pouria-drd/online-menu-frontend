import { Translator } from "@/types";
import { BackendErrors } from "@/types/api";
import { UseFormSetError, FieldValues, Path } from "react-hook-form";

/**
 * Handles backend validation errors and maps them to react-hook-form.
 * Supports:
 * - Field-level errors with translation
 * - Global form errors (key = "form")
 *
 * @template TFormFields - your form data type
 * @param errors - backend errors
 * @param setError - react-hook-form setError
 * @param t - translator function
 * @param setGlobalError - optional callback for global form errors
 */
function handleServerError<TFormFields extends FieldValues>(
	errors: BackendErrors<(keyof TFormFields & string) | "form">,
	setError: UseFormSetError<TFormFields>,
	t?: Translator,
	setGlobalError?: (msg: string) => void,
) {
	for (const key in errors) {
		const fieldErrors =
			errors[key as (keyof TFormFields & string) | "form"];
		if (!fieldErrors?.length) continue;

		const firstError = fieldErrors[0];

		if (key === "form") {
			// Global form error
			const translationKey = `status.${firstError.code}`;

			const message =
				(t && translationKey ? t(translationKey) : undefined) ||
				firstError.message ||
				"Unknown error";

			if (setGlobalError) {
				setGlobalError(message);
			} else {
				// fallback: RHF root error
				setError("root" as Path<TFormFields>, {
					type: "server",
					message,
				});
			}
			continue;
		}

		// Field-level errors
		const translationKey = `fields.${key}.code.${firstError.code}`;

		const message =
			(t && translationKey ? t(translationKey) : undefined) ||
			firstError.message ||
			"Unknown error";

		setError(key as Path<TFormFields>, {
			type: "server",
			message,
		});
	}
}

export default handleServerError;
