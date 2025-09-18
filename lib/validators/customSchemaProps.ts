import { z } from "zod";
import { formatNumberWithDecimal } from "../utils";

// Makes sure price is formatted with two decimal places
export const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places (e.g., 49.99)"
  );
