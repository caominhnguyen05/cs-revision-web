"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import { signIn, signInSocial, signUp } from "@/lib/actions/auth-actions";
import GoogleButton from "@/components/google-button";
import GitHubButton from "@/components/github-button";
import { Divider } from "@/components/auth/divider";

export default function AuthenticationForm() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSocialAuth = async (provider: "google" | "github") => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signInSocial(provider);
      if (result.url) {
        // Redirect on client side
        window.location.href = result.url;
      }
    } catch (err) {
      setError(
        `Error authenticating with ${provider}: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isSignIn) {
        const result = await signIn(email, password);
        if (!result.user) {
          setError("Invalid email or password.");
        } else {
          router.replace("/");
          router.refresh();
        }
      } else {
        const result = await signUp(email, password, name);
        if (!result.user) {
          setError("Failed to create account.");
        } else {
          router.replace("/");
          router.refresh();
        }
      }
    } catch (err) {
      setError(
        `Authentication error: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-0 border-white">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          {isSignIn ? "Welcome Back" : "Create Account"}
        </CardTitle>
        <CardDescription>
          {isSignIn
            ? "Sign in to your account to continue"
            : "Enter your information below to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Social Authentication */}
          <div className="flex flex-col gap-4">
            <GoogleButton
              isLoading={isLoading}
              onClick={() => handleSocialAuth("google")}
            />
            <GitHubButton
              isLoading={isLoading}
              onClick={() => handleSocialAuth("github")}
            />
          </div>

          <Divider />

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isSignIn && (
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required={!isSignIn}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        </div>

        {/* Toggle between Sign In and Sign Up */}
        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          </span>
          <Button
            variant="link"
            className="px-0 font-normal text-purple-800 hover:text-purple-900 underline underline-off-set-4 cursor-pointer"
            onClick={() => {
              setIsSignIn(!isSignIn);
              setError("");
              setName("");
            }}
            disabled={isLoading}
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
