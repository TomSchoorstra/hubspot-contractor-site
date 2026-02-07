"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { site } from "@/content/site";

function MobileMenuPortal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // SSR guard: document is not available during server render
  if (typeof document === "undefined") return null;
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] h-[100dvh] w-[100vw] bg-white md:hidden">
      <div className="flex h-full flex-col">
        {/* Top Bar */}
        <div className="shrink-0 border-b border-border-subtle bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <Link
              href="/"
              onClick={onClose}
              className="text-xl font-bold text-text transition-colors hover:text-accent"
            >
              {site.name}
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="rounded-md p-2 text-text transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Nav Panel */}
        <nav className="flex-1 overflow-y-auto bg-white px-6 py-6">
          <div className="mx-auto max-w-6xl">
            <div className="space-y-2">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-md px-4 py-3 text-lg font-medium text-text transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-border-subtle">
              <Link
                href="/contact"
                onClick={onClose}
                className="block w-full rounded-[var(--radius-md)] bg-accent px-4 py-3 text-center text-base font-medium text-white transition-all duration-200 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Plan a call
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>,
    document.body
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  // Handle escape key and scroll lock
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="relative w-full border-b border-border-subtle bg-surface/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold text-text transition-colors hover:text-accent"
        >
          {site.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-8">
          {site.nav
            .filter((item) => item.href !== "/contact")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-text-secondary transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:rounded-sm"
              >
                {item.label}
              </Link>
            ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center justify-center rounded-[var(--radius-md)] bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-accent-hover hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Plan a call
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="md:hidden rounded-md p-2 text-text transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <span className="sr-only">Open menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu - Full Screen Overlay via Portal */}
      <MobileMenuPortal open={open} onClose={closeMenu} />
    </header>
  );
}
