"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import { allLines } from "@/lib/lines";

function MobileMenuPortal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !menuRef.current) return;

    const menu = menuRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const background = Array.from(document.body.children)
      .filter((node): node is HTMLElement => node instanceof HTMLElement && !node.contains(menu) && !["SCRIPT", "STYLE", "LINK"].includes(node.tagName))
      .map(node => ({ node, inert: node.inert }));

    menu.inert = false;
    background.forEach(({ node }) => { node.inert = true; });
    menu.querySelector<HTMLButtonElement>('button[aria-label="Close menu"]')?.focus({ preventScroll: true });

    const keepFocusInMenu = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first || !last) return;
      if (!menu.contains(document.activeElement) || (event.shiftKey && document.activeElement === first)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", keepFocusInMenu);
    return () => {
      document.removeEventListener("keydown", keepFocusInMenu);
      menu.inert = true;
      background.forEach(({ node, inert }) => { node.inert = inert; });
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open]);

  if (typeof document === "undefined") return null;

  const navItems = site.nav;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          key="mobile-menu"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 32, stiffness: 320 }}
          className="fixed inset-0 z-[9999] h-[100dvh] w-[100vw] bg-night text-white md:hidden"
        >
          <div className="flex h-full flex-col">
            {/* Top Bar */}
            <div className="shrink-0">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" onClick={onClose} className="flex flex-col leading-none">
                  <span className="text-xs font-semibold text-on-night-2">RevOps by</span>
                  <span className="font-display text-2xl font-extrabold leading-none">
                    {site.name}<span className="text-accent">.</span>
                  </span>
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={onClose}
                  className="grid h-12 w-12 place-items-center rounded-full border-2 border-white transition-colors hover:bg-white hover:text-ink"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div aria-hidden="true" className="bundle">
                {allLines.map(line => <i key={line} data-line={line} />)}
              </div>
            </div>

            {/* Nav Panel */}
            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <div className="mx-auto max-w-6xl">
                {navItems.map((item, i) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <motion.div
                      key={item.href}
                      initial={reducedMotion ? false : { opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i + 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={pathname === item.href ? "page" : isActive ? "true" : undefined}
                        className="group flex items-center gap-4 border-b border-white/20 py-4 font-display text-6xl font-extrabold leading-none"
                      >
                        <span aria-hidden="true" className={`h-5 w-5 shrink-0 rounded-full border-4 border-white transition-colors group-hover:bg-accent ${isActive ? "bg-accent" : ""}`} />
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [menuPathname, setMenuPathname] = useState(pathname);

  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  const navItems = site.nav.filter((item) => item.href !== "/contact");

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b-2 bg-white/95 backdrop-blur-sm transition-colors duration-300 ${
        scrolled ? "border-ink" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[78rem] items-center justify-between px-6 py-3 lg:px-10">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="text-xs font-semibold text-text-muted">RevOps by</span>
          <span className="font-display text-2xl font-extrabold leading-none text-text">
            {site.name}<span className="text-accent transition-colors group-hover:text-accent-2">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : isActive ? "true" : undefined}
                className={`group relative px-3 py-3 text-[0.9375rem] font-semibold transition-colors lg:px-4 ${
                  isActive ? "text-text" : "text-text-secondary hover:text-text"
                }`}
              >
                {item.label}
                {/* The active page is the station the line has stopped at. */}
                {isActive ? (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 mx-auto h-3 w-3 rounded-full border-[3px] border-ink bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 40 }}
                  />
                ) : (
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 mx-auto h-3 w-3 scale-0 rounded-full border-[3px] border-ink bg-white transition-transform duration-200 group-hover:scale-100" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button
            href="/contact"
            className="px-5 py-2.5 text-sm"
            analyticsLocation="header"
            showArrow
          >
            Get in touch
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label="Open menu"
          className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink text-text transition-colors hover:bg-ink hover:text-white md:hidden"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5M3.75 16.5h16.5" />
          </svg>
        </button>
      </div>

      <MobileMenuPortal open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
