const configuredSiteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tomschoorstra.com",
);

// Keep older hosting environment values aligned with the public domain.
if (["tomschoorstra.com", "www.tomschoorstra.com"].includes(configuredSiteUrl.hostname)) {
  configuredSiteUrl.hostname = "www.tomschoorstra.com";
  configuredSiteUrl.protocol = "https:";
}

export const SITE_URL = configuredSiteUrl.origin;

export const SITE_SOCIAL_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Tom Schoorstra — HubSpot & RevOps Specialist",
};
