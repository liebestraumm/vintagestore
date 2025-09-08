"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const CredentialsSignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Getting search params in client component
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    const res = await signIn("credentials", {
      redirect: false, // prevents NextAuth from doing its own redirect
      email: formData.get("email"),
      password: formData.get("password"),
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      if (callbackUrl) {
        // If callbaclUrl exists, navigate to shipping-address page
        router.push(callbackUrl);
      } else {
        // Navigate without full reload
        router.push("/");
      }
      // forces server components to re-render with updated session
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            required
            type="email"
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            required
            type="password"
            autoComplete="current-password"
          />
        </div>

        <div>
          <Button disabled={loading} className="w-full" variant="default">
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          {error && (
            <div className="text-center text-destructive mt-2">{error}</div>
          )}
        </div>

        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link target="_self" className="link" href="/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
