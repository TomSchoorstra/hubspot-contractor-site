import { SITE_SOCIAL_IMAGE } from "@/lib/site";
import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Tom Schoorstra — HubSpot & RevOps Specialist",
  description:
    "HubSpot & RevOps specialist helping B2B teams connect customer records, automate handovers and investigate data quality issues. Explore my projects and approach.",
  alternates: { canonical: "/" },
  openGraph: {
    images: [SITE_SOCIAL_IMAGE],
    title: "Tom Schoorstra — HubSpot & RevOps Specialist",
    description:
      "HubSpot & RevOps specialist helping B2B teams connect customer records, automate handovers and investigate data quality issues. Explore my projects and approach.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE_SOCIAL_IMAGE.url],
    title: "Tom Schoorstra — HubSpot & RevOps Specialist",
    description:
      "HubSpot & RevOps specialist helping B2B teams connect customer records, automate handovers and investigate data quality issues. Explore my projects and approach.",
  },
};

export default function Home() {
  return <HomeClient />;
}
