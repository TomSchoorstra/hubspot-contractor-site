export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  nav: NavItem[];
}

export const site: SiteConfig = {
  name: "Tom Schoorstra",
  tagline: "HubSpot contractor for automation, ops, and scalable growth systems.",
  nav: [
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Case studies",
      href: "/case-studies",
    },
    {
      label: "About Me",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
};
