import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup Page",
  description: "Generated by NVH",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
