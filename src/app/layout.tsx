import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, JetBrains_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { BrandProvider } from "@/context/BrandContext";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/shared/floating-actions";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { GoogleAnalytics } from "@/components/seo/google-analytics";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { isLocale, LANG_COOKIE, localeDir, type Locale } from "@/i18n/config";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Engineering Design & Maintenance · Oman & GCC`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Tasheel Engineering",
    "engineering design Oman",
    "maintenance services Muscat",
    "elevator company Oman",
    "CCTV smart home Oman",
    "escalators GCC",
    "building maintenance AMC",
  ],
  authors: [{ name: SITE.legalName }],
  openGraph: {
    type: "website",
    locale: "en_OM",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
  icons: {
    // Google Search needs a crawlable square icon that is a multiple of 48px
    icon: [
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const raw = cookieStore.get(LANG_COOKIE)?.value;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return (
    <html
      lang={locale === "ar" ? "ar" : "en"}
      dir={localeDir(locale)}
      data-locale={locale}
      className={`${jakarta.variable} ${jetbrains.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <LanguageProvider initialLocale={locale}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Suspense fallback={null}>
              <BrandProvider>
                <AuthProvider>
                  <SmoothScroll>
                    <JsonLd />
                    <GoogleAnalytics id={process.env.NEXT_PUBLIC_GA_ID} />
                    <Header />
                    <main id="main">{children}</main>
                    <Footer />
                    <FloatingActions />
                  </SmoothScroll>
                </AuthProvider>
              </BrandProvider>
            </Suspense>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
