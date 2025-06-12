"use client";


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import BootstrapClient from "@/components/BootstrapClient"; // ⬅️ tambahkan import ini

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BootstrapClient /> {/* ⬅️ tambahkan di sini */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
