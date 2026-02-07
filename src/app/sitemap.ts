import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { caseStudies } from "@/content/caseStudies";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/case-studies`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map(
    (caseStudy) => ({
      url: `${BASE_URL}/case-studies/${caseStudy.slug}`,
      lastModified: new Date(),
    })
  );

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes];
}
