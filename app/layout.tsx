import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CS Past Papers Hub",
  description: "Find Cambridge A-Level and IGCSE past papers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Global Navbar */}
        <Navbar />
        {/* Page Wrapper */}
        <main className="container mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
