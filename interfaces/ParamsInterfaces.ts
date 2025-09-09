import { ReactNode } from "react";

export interface IChildrenNode {
  children: Readonly<ReactNode>;
}

export interface ISearchParams {
  searchParams: Promise<{ callbackUrl: string }>;
}
