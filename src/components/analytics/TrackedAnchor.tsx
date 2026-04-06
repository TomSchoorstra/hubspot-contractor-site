"use client";

import { usePathname } from "next/navigation";
import { isValidElement, type AnchorHTMLAttributes, type ReactNode } from "react";
import { trackOutboundClick, type AnalyticsEventParams } from "@/lib/analytics";

type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  analyticsLabel?: string;
  analyticsLocation?: string;
  analyticsParams?: AnalyticsEventParams;
  children: ReactNode;
};

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join(" ").trim();
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getTextContent(node.props.children as ReactNode);
  }

  return "";
}

export default function TrackedAnchor({
  analyticsLabel,
  analyticsLocation,
  analyticsParams,
  children,
  href,
  onClick,
  ...props
}: TrackedAnchorProps) {
  const pathname = usePathname();

  const handleClick: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"] = (event) => {
    onClick?.(event);

    if (event.defaultPrevented || !href) {
      return;
    }

    const url = new URL(href, window.location.origin);
    const resolvedLabel =
      analyticsLabel ?? getTextContent(children) ?? props["aria-label"] ?? url.href;

    trackOutboundClick({
      link_url: url.href,
      link_domain: url.hostname,
      link_text: resolvedLabel || url.href,
      outbound_location: analyticsLocation ?? pathname ?? "unknown",
      ...analyticsParams,
    });
  };

  return (
    <a {...props} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
