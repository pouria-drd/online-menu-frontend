import { redirect } from "next/navigation";

import { getSession } from "@/actions";

async function UserDashboardPage() {
	const session = await getSession();

	if (!session) {
		return redirect("/auth/login");
	}

	return (
		<div className="space-y-8 p-8">
			<h1>UserDashboardPage</h1>
		</div>
	);
}

export default UserDashboardPage;
