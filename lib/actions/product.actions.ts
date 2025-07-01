"use server";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";

// Get the latest products
export const getLatestProducts = async () => {
  return await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });
};

// Get single product by slug
export const getProductBySlug = async (slug: string) => {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
};
