import { getSession } from "@/actions";
import { redirect } from "next/navigation";

async function AdminDashboard() {
	const session = await getSession();

	if (!session) {
		return redirect("/auth/login");
	}
	return <div>AdminDashboard</div>;
}

export default AdminDashboard;
