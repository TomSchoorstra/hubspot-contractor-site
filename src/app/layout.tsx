import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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

const siteUrl = "https://tomschoorstra.com";

export const metadata: Metadata = {
  title: "Tom Schoorstra — HubSpot contractor",
  description:
    "Independent HubSpot contractor helping SMBs and scale-ups with automation, integrations, custom objects, and pipeline optimization. No agency overhead.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Tom Schoorstra",
    title: "Tom Schoorstra — HubSpot contractor",
    description:
      "Independent HubSpot contractor helping SMBs and scale-ups with automation, integrations, custom objects, and pipeline optimization. No agency overhead.",
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
      "Independent HubSpot contractor helping SMBs and scale-ups with automation, integrations, custom objects, and pipeline optimization. No agency overhead.",
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
  url: "https://tomschoorstra.com",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} min-h-screen bg-bg text-text antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
