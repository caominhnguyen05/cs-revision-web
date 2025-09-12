import { auth } from "@/lib/auth";
import AuthenticationForm from "./auth-form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthenticationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/profile");
  }

  return (
    <div className="flex items-center justify-center bg-background py-8 px-4">
      <div className="w-full max-w-md">
        <AuthenticationForm />
      </div>
    </div>
  );
}
