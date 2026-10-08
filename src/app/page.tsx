import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Tom Schoorstra — HubSpot & RevOps Specialist",
  description:
    "HubSpot & RevOps specialist helping B2B teams connect customer records, automate handovers and investigate data quality issues. Explore my work at AIHR.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tom Schoorstra — HubSpot & RevOps Specialist",
    description:
      "HubSpot & RevOps specialist helping B2B teams connect customer records, automate handovers and investigate data quality issues. Explore my work at AIHR.",
    url: "/",
  },
};

export default function Home() {
  return <HomeClient />;
}
