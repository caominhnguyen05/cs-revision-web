import { auth } from "@/lib/auth";
import DashboardClientPage from "./profile-dashboard";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPastPaperLists } from "@/lib/actions/paper-actions";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  const paperLists = await getPastPaperLists();

  return (
    <DashboardClientPage session={session} initialPaperLists={paperLists} />
  );
}
