import { getTranslations } from "next-intl/server";
import { LanguageSwitcher, ThemeSwitcher } from "@/components/preferences";
import Link from "next/link";
import { Button } from "@/components/ui";

async function RootPage() {
	const t = await getTranslations("Pages.RootPage");

	return (
		<div className="bg-card space-y-4 p-8 w-fit rounded-2xl mx-auto shadow-xl">
			<p>{t("test")}</p>

			<div className="flex item-center justify-center gap-4">
				<ThemeSwitcher />
				<LanguageSwitcher />
			</div>

			<div className="flex item-center justify-center gap-4">
				<Link href="/auth/login">
					<Button variant={"link"}>Login</Button>
				</Link>
			</div>
		</div>
	);
}

export default RootPage;
