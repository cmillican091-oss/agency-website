import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Mission Control",
  description:
    "A futuristic multi-agent AI operations center with live analytics, orchestration, and infrastructure monitoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
