"use server";

import authConfig from "@/app/auth";
import { signInFormSchema } from "../validators";
import NextAuth from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const { signIn, signOut } = NextAuth(authConfig);

// Sign in the user with credentials
export const signInWithCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid email or password" };
  }
};

// Sign the user out
export const signOutUser = async () => {
  await signOut();
};
