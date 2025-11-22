import { Metadata } from "next";
import { Fragment, PropsWithChildren } from "react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("Pages.RegisterPage.layout");

	return {
		title: t("title"),
		description: t("description"),
	};
}

function RegisterLayout({ children }: Readonly<PropsWithChildren>) {
	return <Fragment>{children}</Fragment>;
}

export default RegisterLayout;
