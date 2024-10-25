import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linkalike",
  description: "Search products similar to what you are looking for.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
