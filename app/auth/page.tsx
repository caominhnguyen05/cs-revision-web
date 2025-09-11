import AuthForm from "./auth-form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  );
}
