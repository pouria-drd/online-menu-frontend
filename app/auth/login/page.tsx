import { redirect } from "next/navigation";

import { getSession } from "@/actions";
import { LoginAction } from "@/components/auth";
import { GridShape } from "@/components/common";

async function LoginPage() {
	const session = await getSession();
	if (session) {
		redirect("/panel/user");
	}

	return (
		<div className="flex items-center justify-center relative p-4 h-dvh">
			<GridShape />
			<LoginAction />
		</div>
	);
}

export default LoginPage;
