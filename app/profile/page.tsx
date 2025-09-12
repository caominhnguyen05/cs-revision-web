import { auth } from "@/lib/auth";
import DashboardClientPage from "./profile-dashboard";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  return <DashboardClientPage session={session} />;
}
