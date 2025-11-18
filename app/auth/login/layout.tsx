import { Metadata } from "next";
import { Fragment, PropsWithChildren } from "react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("Pages.LoginPage.layout");

	return {
		title: t("title"),
		description: t("description"),
	};
}

function LoginLayout({ children }: Readonly<PropsWithChildren>) {
	return <Fragment>{children}</Fragment>;
}

export default LoginLayout;
