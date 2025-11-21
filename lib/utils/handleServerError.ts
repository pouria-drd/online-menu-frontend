import { UseFormSetError, FieldValues, Path } from "react-hook-form";

import { Translator } from "@/types";
import {
	BackendErrorInput,
	BackendErrorItem,
	BackendErrors,
} from "@/types/api";

interface HandleServerErrorOptions<TFormFields extends FieldValues> {
	statusCode?: number;
	errors?: BackendErrors<(keyof TFormFields & string) | "form">;
	setError: UseFormSetError<TFormFields>;
	translate?: Translator;
	setGlobalError?: (msg: string) => void;
}

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
function handleServerError<TFormFields extends FieldValues>({
	statusCode,
	errors,
	setError,
	translate,
	setGlobalError,
}: HandleServerErrorOptions<TFormFields>) {
	// --- 1) Handle status-based errors ---
	if (statusCode === 429) {
		setGlobalError?.(
			translate?.("status.too_many_requests") ?? "Too many requests",
		);
		return;
	}

	if (statusCode === 401) {
		setGlobalError?.(translate?.("status.unauthorized") ?? "Unauthorized");
		return;
	}

	if (statusCode === 403) {
		setGlobalError?.(translate?.("status.forbidden") ?? "Forbidden");
		return;
	}

	if (statusCode === 500) {
		setGlobalError?.(translate?.("status.server_error") ?? "Server error");
		return;
	}

	// --- 2) Handle backend validation errors ---
	if (!errors) return;

	const normalizeErrors = (value: BackendErrorInput): BackendErrorItem[] => {
		if (!value) return [];
		if (Array.isArray(value)) return value;
		if (typeof value === "string") return [{ message: value }];
		return [value];
	};

	for (const key in errors) {
		const rawErrors = errors[key];
		const fieldErrors = normalizeErrors(rawErrors);

		if (fieldErrors.length === 0) continue;

		const firstError = fieldErrors[0];

		// Global error (form)
		if (key === "form") {
			const translationKey = `status.${firstError.code}`;
			const msg =
				(translate ? translate(translationKey) : undefined) ??
				firstError.message ??
				"Unknown error";

			setGlobalError?.(msg);
			return;
		}

		// Field-level errors
		const translationKey = `fields.${key}.code.${firstError.code}`;
		const msg =
			(translate ? translate(translationKey) : undefined) ??
			firstError.message ??
			"Unknown error";

		setError(key as Path<TFormFields>, {
			type: "server",
			message: msg,
		});
	}
}
export default handleServerError;
