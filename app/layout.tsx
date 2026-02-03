import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Make sure this path matches where you saved the file
import SplashCursor from "@/components/SplashCursor";
import AICore from "@/components/AICore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creative Portfolio",
  description: "A high-end interactive experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        {/* The Cursor sits here at the root level. 
            The pointer-events: none in the component will allow 
            users to still interact with the content below.
        */}
        <SplashCursor />
        <AICore />

        {children}
      </body>
    </html>
  );
}