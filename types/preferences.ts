import { ComponentType } from "react";
import { useTranslations } from "next-intl";

export type Translator = ReturnType<typeof useTranslations>;

export type Theme = {
	value: ThemeType;
	tKey: string;
	icon: ComponentType<{ className?: string }>;
};

export type LocaleType = "en" | "fa";

export type Language = {
	code: LocaleType;
	label: string;
	direction: "rtl" | "ltr";
};

export type ThemeType = "light" | "dark" | "system";
