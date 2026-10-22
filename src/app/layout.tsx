import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import { SITE_URL, SITE_SOCIAL_IMAGE } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = SITE_URL;
const siteEnv =
  process.env.NEXT_PUBLIC_SITE_ENV ??
  process.env.VERCEL_ENV ??
  process.env.NODE_ENV;
const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-KXGDV2PF";
const analyticsEnabled = Boolean(gtmId) && siteEnv === "production";


export const metadata: Metadata = {
  title: "Tom Schoorstra — HubSpot & RevOps Specialist",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  description:
    "HubSpot & RevOps specialist helping B2B teams connect customer records, automate handovers and investigate data quality issues.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    images: [SITE_SOCIAL_IMAGE],
    type: "website",
    url: siteUrl,
    siteName: "Tom Schoorstra",
    title: "Tom Schoorstra — HubSpot & RevOps Specialist",
    description:
      "HubSpot & RevOps specialist helping B2B teams connect customer records, automate handovers and investigate data quality issues.",
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE_SOCIAL_IMAGE.url],
    title: "Tom Schoorstra — HubSpot & RevOps Specialist",
    description:
      "HubSpot & RevOps specialist helping B2B teams connect customer records, automate handovers and investigate data quality issues.",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tom Schoorstra",
  jobTitle: "HubSpot & RevOps specialist",
  description:
    "HubSpot & RevOps specialist working on CRM architecture, integrations, operational data quality and custom record interfaces.",
  url: SITE_URL,
  sameAs: ["https://www.linkedin.com/in/tom-schoorstra-807899113/"],
  knowsAbout: [
    "HubSpot",
    "CRM automation",
    "RevOps",
    "Zapier",
    "HubSpot integrations",
    "Custom objects",
    "Pipeline optimization",
    "CRM architecture",
    "Data quality monitoring",
    "HubSpot UI extensions",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "NL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-site-env={siteEnv}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} min-h-screen bg-bg text-text antialiased`}
      >
        {analyticsEnabled && gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {analyticsEnabled ? (
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
        ) : null}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
