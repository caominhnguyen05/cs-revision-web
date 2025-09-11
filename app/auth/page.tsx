import { auth } from "@/lib/auth";
import AuthForm from "./auth-form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/profile");
  }
  return (
    <div className="flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  );
}
