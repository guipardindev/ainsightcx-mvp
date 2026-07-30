import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AInsightCX — Insights de atendimento em minutos, com IA",
    template: "%s · AInsightCX",
  },
  description:
    "Transforme milhares de interações de atendimento em insights priorizados e planos de ação executivos em minutos, não semanas — com IA generativa.",
  keywords: [
    "customer experience",
    "IA generativa",
    "análise de atendimento",
    "customer success",
    "SaaS B2B",
  ],
  authors: [{ name: "Guilherme Pardin de Almeida", url: "https://github.com/guipardindev" }],
  openGraph: {
    title: "AInsightCX — Insights de atendimento em minutos, com IA",
    description:
      "Milhares de interações de suporte viram temas priorizados, resumos executivos e planos de ação em minutos.",
    type: "website",
    locale: "pt_BR",
    siteName: "AInsightCX",
  },
  twitter: {
    card: "summary_large_image",
    title: "AInsightCX — Insights de atendimento em minutos, com IA",
    description:
      "Milhares de interações de suporte viram temas priorizados, resumos executivos e planos de ação em minutos.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
