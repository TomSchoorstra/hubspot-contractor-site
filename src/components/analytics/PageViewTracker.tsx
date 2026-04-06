"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const queryString = searchParams.toString();
    const currentPath = queryString ? `${pathname}?${queryString}` : pathname;

    if (!currentPath || lastTrackedPath.current === currentPath) {
      return;
    }

    lastTrackedPath.current = currentPath;
    trackPageView({ page_path: currentPath });
  }, [pathname, searchParams]);

  return null;
}
