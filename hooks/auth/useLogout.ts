"use client";

import { toast } from "sonner";
import { logoutAction } from "@/actions";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { startTransition, useState } from "react";

function useLogout() {
	const router = useRouter();
	const t = useTranslations("Components.LogoutAction");
	const [isLoading, setIsLoading] = useState(false);

	const handleLogout = async () => {
		setIsLoading(true);
		try {
			// clear user session
			await logoutAction();
			// redirect to login page
			toast.success(t("message"));
			startTransition(() => router.push("/auth/login"));
		} catch (error) {
			if (process.env.NODE_ENV === "development") {
				console.error("[LogoutAction]", error);
			}

			toast.error(t("error"));
		} finally {
			setIsLoading(false);
		}
	};

	return {
		t,
		isLoading,
		handleLogout,
	};
}

export default useLogout;
