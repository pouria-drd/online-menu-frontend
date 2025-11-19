import { redirect } from "next/navigation";

import { getSession } from "@/actions";
import { LoginForm } from "@/components/forms";

async function LoginPage() {
	const session = await getSession();
	if (session) {
		redirect("/panel/user");
	}

	return (
		<div className="flex items-center justify-center h-dvh">
			<LoginForm />
		</div>
	);
}

export default LoginPage;
