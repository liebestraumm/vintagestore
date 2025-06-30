"use server";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { PrismaClient } from "../generated/prisma";

// Get the latest products
export async function getLatestProducts() {
  const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  // Serialize decimal fields (price and rating) before passing field's types to Zod
  return data.map((product) => ({
    ...product,
    price: product.price.toFixed(2),
    rating: product.rating.toFixed(1),
  }));
}
