"use client";

import { useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("banner-dismissed", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("banner-dismissed", callback);
  };
}

export default function AnnouncementBanner() {
  const visible = useSyncExternalStore(
    subscribe,
    () => !localStorage.getItem("banner-dismissed"),
    () => false,
  );

  const dismiss = () => {
    localStorage.setItem("banner-dismissed", "1");
    window.dispatchEvent(new Event("banner-dismissed"));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div className="relative bg-accent px-4 py-2.5">
            {/* Subtle shimmer line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Pulsing dot */}
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                <p className="text-sm font-medium text-white">
                  Not taking on clients just yet, but feel free to have a look around.
                </p>
              </div>

              <button
                onClick={dismiss}
                aria-label="Dismiss banner"
                className="flex-shrink-0 rounded-lg p-1 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
              >
                <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 16 16">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
