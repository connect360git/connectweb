import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connect — Agência de Marketing Digital | Brasil e Exterior",
  description: "Marketing digital para empreendedores brasileiros no Brasil e no mundo. Tráfego pago, social media, SEO, branding e muito mais. Conectamos sua marca ao próximo nível.",
  keywords: ["agência de marketing digital", "tráfego pago", "social media", "SEO", "branding", "marketing para brasileiros no exterior", "PME", "empreendedores"],
  authors: [{ name: "Connect" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Connect — Agência de Marketing Digital",
    description: "Conectamos sua marca ao próximo nível. Marketing digital para empreendedores brasileiros no Brasil e no mundo.",
    url: "https://connect.com.br",
    siteName: "Connect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect — Agência de Marketing Digital",
    description: "Conectamos sua marca ao próximo nível. Marketing digital para empreendedores brasileiros no Brasil e no mundo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
