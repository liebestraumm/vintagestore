import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";
import { PrismaUniqueConstraintError } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Converts Prisma objects to plain Javascript objects
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// Format Errors
export function formatError(error: unknown): string | null {
  if (error instanceof ZodError) {
    // Handle Zod error
    const fieldErrors = error.errors.map((err) => err.message);
    return fieldErrors.join(". ");
  }

  // Prisma unique constraint error
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as PrismaUniqueConstraintError).code === "P2002"
  ) {
    const prismaError = error as PrismaUniqueConstraintError;
    const field = Array.isArray(prismaError.meta?.target)
      ? prismaError.meta?.target[0]
      : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  if (error instanceof Error) {
    // Handle generic error
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }

  // Fallback for unexpected error shapes
  return "An unexpected error occurred";
}
