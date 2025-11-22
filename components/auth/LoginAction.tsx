"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { LocaleType } from "@/types";
import { AppLogo } from "@/components/images";
import { LoginForm, OTPForm } from "./forms";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui";

function LoginAction() {
	const locale = useLocale() as LocaleType;
	const t = useTranslations("Components.LoginAction");

	return (
		<Card className="w-full sm:max-w-[340px] gap-4 shadow-xl">
			<CardHeader className="flex flex-col items-center justify-center text-center pt-2">
				<AppLogo />
				<CardTitle>{t("title")}</CardTitle>
				<CardDescription>{t("description")}</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs
					dir={locale === "fa" ? "rtl" : "ltr"}
					defaultValue="password"
					className="items-center justify-center w-full">
					<TabsList className="grid grid-cols-2 mb-3 w-full">
						<TabsTrigger value="password">
							{t("password")}
						</TabsTrigger>
						<TabsTrigger value="otp">{t("otp")}</TabsTrigger>
					</TabsList>

					<TabsContent value="password" className="w-full">
						<LoginForm />
					</TabsContent>

					<TabsContent value="otp" className="w-full">
						<OTPForm otpType="login" />
					</TabsContent>
				</Tabs>
			</CardContent>

			<CardFooter className="flex-col gap-4">
				<Link
					href={"/auth/register"}
					className="text-muted-foreground text-sm">
					{t("message")}
					<Button variant={"link"} className="p-0 mx-1">
						{t("register")}
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}

export default LoginAction;
