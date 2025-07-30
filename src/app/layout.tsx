import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Chain Audit",
  description: "AI-Powered Smart Contract Auditing Tool",
  openGraph: {
    title: "Chain Audit",
    description: "AI-Powered Smart Contract Auditing Tool",
    url: "https://chain-audit.com",
    siteName: "Chain Audit",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chain Audit",
    description: "AI-Powered Smart Contract Auditing Tool",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
