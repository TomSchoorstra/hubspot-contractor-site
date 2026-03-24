"use client";

import { useSearchParams } from "next/navigation";

export default function StatusBanner() {
  const params = useSearchParams();
  const success = params.get("success");
  const error = params.get("error");

  if (!success && !error) return null;

  if (success) {
    return (
      <div className="rounded-xl border border-accent-2/30 bg-accent-2-light px-5 py-4 text-sm font-medium text-accent-2">
        All set! The HubSpot Tips bot has been installed in your Slack workspace. You will receive a new tip every Monday.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
      Something went wrong during installation. Please try again or get in touch if the issue persists.
    </div>
  );
}
