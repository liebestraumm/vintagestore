"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { signUp } from "@/lib/actions/user.actions";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Getting search params in client component
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    try {
      // Signing user up with signUp user.actions function
      const signUpResponse = await signUp(formData);
      if (!signUpResponse.success) {
        setError(signUpResponse.message);
        return;
      }

      const res = await signIn("credentials", {
        redirect: false, // prevents NextAuth from doing its own redirect
        email: formData.get("email"),
        password: formData.get("password"),
      });

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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="current-password"
          />
        </div>

        <div>
          <Button disabled={loading} className="w-full" variant="default">
            {loading ? "Submitting..." : "Sign Up"}
          </Button>
          {error && (
            <div className="text-center text-destructive mt-2">{error}</div>
          )}
        </div>

        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link
            target="_self"
            className="link"
            href={`/sign-in?callbackUrl=${callbackUrl}`}
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
