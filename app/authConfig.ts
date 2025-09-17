import { compareSync } from "bcrypt-ts-edge";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "@/db/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | unknown;
      name?: string | null;
      email?: string | null;
      role?: string | unknown;
    };
  }
    interface User {
    id: string;
    name?: string | null;
    role?: string | null;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    id: string
    role?: string | null;
  }
}

const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: "email",
        },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        // Find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
        // Check if user exists and password is correct
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );
          // If password is correct, return user object
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        // If user doesn't exist or password is incorrect, return null
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, trigger }) {
      // Set the user id on the session
      if (token.sub) {
        session.user.id = token.sub;
      }
      // Map the token data to the session object
      session.user.role = token.role;

      // Optionally handle session updates (like name change)
      if (trigger === "update" && token.name) {
        session.user.name = token.name;
      }

      // Return the updated session object
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      
      // Assign user fields to token
      if (user) {
        token.role = user.role;

        // If user has no name, use email as their default name. Useful for third-party providers (i.e Google, Facebook providers)
        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];

          // Update the user in the database with the new name
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }

      // Handle session updates (e.g., name change)
      if (session?.user.name && trigger === "update") {
        token.name = session.user.name;
      }

      return token;
    },
  },
};

export default authConfig;
