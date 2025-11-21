import { redirect } from "next/navigation";

import { getSession } from "@/actions";
import { LoginAction } from "@/components/auth";

async function LoginPage() {
	const session = await getSession();
	if (session) {
		redirect("/panel/user");
	}

	return (
		<div className="flex items-center justify-center h-dvh">
			<LoginAction />
		</div>
	);
}

export default LoginPage;
