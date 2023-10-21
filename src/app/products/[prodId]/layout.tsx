import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Detail Product",
  description: "Generated by NVH",
};

export default function ViewDetailProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
