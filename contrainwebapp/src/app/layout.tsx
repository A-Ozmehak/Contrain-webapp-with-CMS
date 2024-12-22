import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Script from 'next/script';
import Footer from "@/components/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contrain",
  description: "Contrain is a prototype company",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Script src="https://kit.fontawesome.com/d685d0b3c0.js" crossOrigin="anonymous"></Script>
          <div className="wrapper">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </>
  );
}
