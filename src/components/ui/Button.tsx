"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isValidElement, type ReactNode } from "react";
import { trackCtaClick, trackEvent, type AnalyticsEventParams } from "@/lib/analytics";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  showArrow?: boolean;
  analyticsEvent?: string;
  analyticsParams?: AnalyticsEventParams;
  analyticsLabel?: string;
  analyticsLocation?: string;
} & (
  | {
      href: string;
      onClick?: never;
      type?: never;
    }
  | {
      href?: never;
      onClick?: () => void;
      type?: "button" | "submit" | "reset";
    }
);

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

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled = false,
  showArrow = false,
  analyticsEvent,
  analyticsParams,
  analyticsLabel,
  analyticsLocation,
}: ButtonProps) {
  const pathname = usePathname();
  const baseStyles =
    "inline-flex items-center justify-center gap-2.5 rounded-full border-2 font-bold transition-colors duration-200 group";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // Primary keeps ink on a line colour, so it reads on paper, night and floods alike.
  const variantStyles = {
    primary:
      "bg-accent border-accent text-ink hover:bg-accent-3 hover:border-accent-3",
    secondary:
      "border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
    ghost:
      "border-transparent text-ink hover:border-ink",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  const arrow = showArrow ? (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : null;

  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${className ?? ""}`;

  if (href) {
    const handleLinkClick = () => {
      if (analyticsEvent) {
        trackEvent(analyticsEvent, analyticsParams);
        return;
      }

      if (href === "/contact") {
        const resolvedLabel = analyticsLabel ?? getTextContent(children) ?? href;

        trackCtaClick({
          cta_label: resolvedLabel || href,
          cta_location: analyticsLocation ?? pathname ?? "unknown",
          destination: href,
          ...analyticsParams,
        });
      }
    };

    return (
      <Link href={href} className={classes} onClick={handleLinkClick}>
        {children}
        {arrow}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
      {arrow}
    </button>
  );
}
