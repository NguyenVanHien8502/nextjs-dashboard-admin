import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Detail Movie",
  description: "Generated by NVH",
};

export default function ViewDetailMovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}