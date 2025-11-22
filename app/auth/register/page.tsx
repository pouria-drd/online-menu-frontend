import { redirect } from "next/navigation";

import { getSession } from "@/actions";
import { GridShape } from "@/components/common";
import { RegisterAction } from "@/components/auth";

async function RegisterPage() {
	const session = await getSession();
	if (session) {
		redirect("/panel/user");
	}

	return (
		<div className="flex items-center justify-center relative p-4 h-dvh">
			<GridShape />
			<RegisterAction />
		</div>
	);
}

export default RegisterPage;
