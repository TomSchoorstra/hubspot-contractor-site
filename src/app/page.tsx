import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Tom Schoorstra — HubSpot Contractor",
  description:
    "Independent HubSpot contractor helping SMBs and scale-ups with automation, integrations, custom object development, and pipeline optimization.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tom Schoorstra — HubSpot Contractor",
    description:
      "Independent HubSpot contractor helping SMBs and scale-ups with automation, integrations, custom object development, and pipeline optimization.",
    url: "/",
  },
};

export default function Home() {
  return <HomeClient />;
}
