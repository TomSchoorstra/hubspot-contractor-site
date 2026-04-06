type AnalyticsValue = string | number | boolean | null | undefined;

export type AnalyticsEventParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-KXGDV2PF";

function getSiteEnv(): string | undefined {
  if (typeof document !== "undefined") {
    return document.documentElement.dataset.siteEnv;
  }

  return process.env.NEXT_PUBLIC_SITE_ENV ?? process.env.NODE_ENV;
}

export function isAnalyticsEnabled(): boolean {
  return typeof window !== "undefined" && Boolean(gtmId) && getSiteEnv() === "production";
}

export function trackEvent(event: string, params: AnalyticsEventParams = {}) {
  if (!isAnalyticsEnabled()) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...params,
  });
}

export function trackPageView(params: AnalyticsEventParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  trackEvent("page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    ...params,
  });
}

export function trackCtaClick(params: AnalyticsEventParams = {}) {
  trackEvent("cta_click", params);
}

export function trackOutboundClick(params: AnalyticsEventParams = {}) {
  trackEvent("outbound_click", params);
}

export function trackLead(params: AnalyticsEventParams = {}) {
  trackEvent("generate_lead", params);
}
