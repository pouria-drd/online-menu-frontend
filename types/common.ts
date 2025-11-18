import { Locales } from "@/constants";
import { ComponentType } from "react";
import { useTranslations } from "next-intl";

export type Translator = ReturnType<typeof useTranslations>;

// ============================================================================
// Preferences
// ============================================================================

export type Theme = {
	value: ThemeType;
	tKey: string;
	icon: ComponentType<{ className?: string }>;
};

export type LocaleType = keyof typeof Locales;

export type Language = {
	code: LocaleType;
	label: string;
	direction: "rtl" | "ltr";
};

export type ThemeType = "light" | "dark" | "system";
