import { getSession } from "@/actions";
import { redirect } from "next/navigation";

async function UserDashboardPage() {
	const session = await getSession();

	if (!session) {
		return redirect("/auth/login");
	}

	return (
		<div>
			<h1>UserDashboardPage</h1>
		</div>
	);
}

export default UserDashboardPage;
