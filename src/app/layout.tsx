import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/layout/Header";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import Footer from "@/components/layout/Footer";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = SITE_URL;
const siteEnv =
  process.env.NEXT_PUBLIC_SITE_ENV ??
  process.env.VERCEL_ENV ??
  process.env.NODE_ENV;
const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-KXGDV2PF";
const analyticsEnabled = Boolean(gtmId) && siteEnv === "production";


export const metadata: Metadata = {
  title: "Tom Schoorstra — HubSpot contractor",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  description:
    "Independent HubSpot contractor helping SMBs and scale-ups with automation, integrations, custom object development, and pipeline optimization.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Tom Schoorstra",
    title: "Tom Schoorstra — HubSpot contractor",
    description:
      "Independent HubSpot contractor helping SMBs and scale-ups with automation, integrations, custom object development, and pipeline optimization.",
    images: [
      {
        url: "/about-photo.jpeg", // Replace with a dedicated 1200×630 OG image when available
        width: 1200,
        height: 630,
        alt: "Tom Schoorstra — Independent HubSpot Contractor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tom Schoorstra — HubSpot contractor",
    description:
      "Independent HubSpot contractor helping SMBs and scale-ups with automation, integrations, custom object development, and pipeline optimization.",
    images: ["/about-photo.jpeg"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tom Schoorstra",
  jobTitle: "Independent HubSpot Contractor",
  description:
    "Independent HubSpot contractor helping SMBs and scale-ups with automation, integrations, custom objects, and pipeline optimization.",
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
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "NL",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Tom Schoorstra — HubSpot Contractor",
  description:
    "Independent HubSpot contractor helping SMBs and scale-ups with automation, integrations, custom objects, and pipeline optimization.",
  url: SITE_URL,
  founder: { "@type": "Person", name: "Tom Schoorstra" },
  areaServed: "NL",
  knowsAbout: ["HubSpot", "CRM", "RevOps", "Marketing Automation"],
  sameAs: ["https://www.linkedin.com/in/tom-schoorstra-807899113/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-site-env={siteEnv}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} min-h-screen bg-bg text-text antialiased`}
      >
        {analyticsEnabled && gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {analyticsEnabled ? (
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
        ) : null}
        <AnnouncementBanner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
