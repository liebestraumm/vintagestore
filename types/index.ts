import { insertProductSchema } from "@/lib/validators";
import { z } from "zod";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
  rating: string;
  numReviews: number;
};

export type PrismaUniqueConstraintError = {
  code: "P2002";
  meta?: { target?: string[] };
};
