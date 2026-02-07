import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Kalam, Inter } from 'next/font/google';

const kalam = Kalam({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-kalam',
  display: 'swap',
});

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "AI SDK Demo",
  description: "Vercel AI SDK 6 demos with Google Gemini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${kalam.variable} ${inter.variable}`}>
      <body className="antialiased font-['Inter',var(--font-inter),'SF_Pro_Text','Helvetica_Neue',Helvetica,Arial,sans-serif]">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
