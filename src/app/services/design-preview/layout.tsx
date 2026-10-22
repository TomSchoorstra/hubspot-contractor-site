import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expertise design previews | Tom Schoorstra",
  robots: { index: false, follow: false },
  alternates: { canonical: "/services" },
};

export default function DesignPreviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
