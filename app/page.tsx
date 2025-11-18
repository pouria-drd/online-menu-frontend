import { getTranslations } from "next-intl/server";
import { LanguageSwitcher, ThemeSwitcher } from "@/components/preferences";

async function RootPage() {
	const t = await getTranslations("Pages.RootPage");

	return (
		<div className="space-y-4 p-8">
			<p>{t("test")}</p>

			<div className="flex item-center gap-4">
				<ThemeSwitcher />
				<LanguageSwitcher />
			</div>
		</div>
	);
}

export default RootPage;
