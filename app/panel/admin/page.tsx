import { redirect } from "next/navigation";

import { getSession } from "@/actions";
import { LogoutAction } from "@/components/common";

async function AdminDashboard() {
	const session = await getSession();

	if (!session) {
		return redirect("/auth/login");
	}
	return (
		<div className="space-y-8 p-8">
			<h1>AdminDashboard</h1>

			<LogoutAction />
		</div>
	);
}

export default AdminDashboard;
