import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Category",
  description: "Generated by NVH",
};

export default function ListCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
