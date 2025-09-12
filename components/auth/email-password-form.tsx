import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { AuthFormData } from "./types";

interface EmailPasswordFormProps {
  isSignIn: boolean;
  formData: AuthFormData;
  isLoading: boolean;
  onFormDataChange: (field: keyof AuthFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function EmailPasswordForm({
  isSignIn,
  formData,
  isLoading,
  onFormDataChange,
  onSubmit,
}: EmailPasswordFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {!isSignIn && (
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            required={!isSignIn}
            value={formData.name}
            onChange={(e) => onFormDataChange("name", e.target.value)}
            disabled={isLoading}
          />
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          value={formData.email}
          onChange={(e) => onFormDataChange("email", e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          {isSignIn && (
            <Button
              variant="link"
              size="sm"
              className="ml-auto px-0 font-normal"
              type="button"
            >
              Forgot your password?
            </Button>
          )}
        </div>
        <Input
          id="password"
          type="password"
          required
          value={formData.password}
          onChange={(e) => onFormDataChange("password", e.target.value)}
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-purple-800 hover:bg-purple-900 cursor-pointer"
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading
          ? isSignIn
            ? "Signing in..."
            : "Creating account..."
          : isSignIn
          ? "Sign In"
          : "Create Account"}
      </Button>
    </form>
  );
}
