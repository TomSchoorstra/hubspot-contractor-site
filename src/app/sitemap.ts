import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { caseStudies } from "@/content/caseStudies";

const siteUrl = "https://tomschoorstra.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: siteUrl, priority: 1.0, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/case-studies`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/contact`, priority: 0.7, changeFrequency: "yearly" as const },
    { url: `${siteUrl}/app-catalog`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/hubspot-enablement`, priority: 0.6, changeFrequency: "monthly" as const },
  ];

  const servicePages = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const caseStudyPages = caseStudies.map((study) => ({
    url: `${siteUrl}/case-studies/${study.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...servicePages, ...caseStudyPages];
}
