import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JSF Online Shop",
  description: "Course Assignment - JavaScript Frameworks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Header />

          <main className="min-h-screen">{children}</main>

          <footer className="p-4 bg-sky-950 text-white text-center">
            <p>&copy; {new Date().getFullYear()} JSFW Course Assignment.</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
