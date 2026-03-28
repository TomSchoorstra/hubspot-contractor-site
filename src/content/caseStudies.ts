export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  companySize: string;
  summary: string;
  challenge: string[];
  approach: string[];
  solution: string[];
  results: Array<{ label: string; value: string }>;
  stack: string[];
  relatedServices: string[]; // slugs of related services
};

export const caseStudiesHeroIntro =
  "Real projects, real results. Here's how I've helped teams get more out of HubSpot.";

export const caseStudies: CaseStudy[] = [
  {
    slug: "finance-automation",
    title: "From manual order entry to one-click invoicing",
    industry: "HR Software",
    companySize: "50-200 employees",
    summary:
      "Finance was spending 10-15 hours each week copying order data between systems. A Zapier-powered automation reduced the process to a single button click.",
    challenge: [
      "For every new order, finance had to manually copy customer and billing data from HubSpot",
      "Data then had to be entered into WooCommerce, and again into Exact for invoicing",
      "The process took 10-15 hours every week and was prone to errors",
    ],
    approach: [
      "Mapped out the full order-to-invoice flow across all three systems",
      "Identified which data needed to sync and at what trigger points",
      "Built a Zapier automation that connects HubSpot, WooCommerce, and Exact",
      "Added a single approval step so finance stays in control",
    ],
    solution: [
      "Finance reviews billing details in HubSpot and clicks one button",
      "Zapier automatically creates the order in WooCommerce",
      "WooCommerce generates the invoice in Exact once payment is confirmed",
      "The entire flow runs without manual data entry",
    ],
    results: [
      { label: "Time saved", value: "10-15 hrs/week" },
      { label: "Process speed", value: "~90% faster" },
      { label: "Manual entry", value: "Eliminated" },
      { label: "Error rate", value: "Significantly reduced" },
    ],
    stack: ["HubSpot", "Zapier", "WooCommerce", "Exact"],
    relatedServices: ["automation", "integrations"],
  },
  {
    slug: "customer-lifecycle",
    title: "From scattered deals to full customer visibility",
    industry: "HR Software",
    companySize: "50-200 employees",
    summary:
      "With no central customer record, historical data was lost with every renewal. A custom License object now ties everything together.",
    challenge: [
      "The team worked entirely from deals, with no overarching customer record",
      "Every renewal meant duplicating a deal, losing historical context",
      "No way to see total customer value, track churn risk, or forecast renewals",
    ],
    approach: [
      "Analyzed how customer data flowed through the existing deal structure",
      "Designed a custom License object as the central customer record",
      "Planned integrations with the backend to pull in product usage data",
      "Built a migration path for existing customer data",
    ],
    solution: [
      "Created a License object that connects to all related deals: new, renewal, upgrade, and churn",
      "Integrated with the backend via Zapier to sync user activity and roles",
      "Built reporting for ARR, contract value, and Monthly Active Users per customer",
      "Enabled renewal forecasting based on license end dates",
    ],
    results: [
      { label: "Forecast horizon", value: "Up to 1 year" },
      { label: "Reporting time", value: "~50% faster" },
      { label: "Customer visibility", value: "Complete" },
      { label: "Churn tracking", value: "Now possible" },
    ],
    stack: ["HubSpot", "Zapier", "Custom objects", "Backend integration"],
    relatedServices: ["custom-objects"],
  },
  {
    slug: "pipeline-consolidation",
    title: "Two messy pipelines became one source of truth",
    industry: "HR Software",
    companySize: "50-200 employees",
    summary:
      "Separate pipelines for different product lines led to duplicated deals and unreliable reporting. Consolidation brought standardization and cleaner data.",
    challenge: [
      "Sales used two separate pipelines for different product lines",
      "Deals were copied between pipelines, creating duplicates",
      "Reporting required pulling from multiple sources and couldn't be trusted",
    ],
    approach: [
      "Audited both pipelines to understand stages, fields, and workflows",
      "Identified overlaps and inconsistencies in the sales process",
      "Designed a unified structure that works for all product lines",
      "Created a migration plan to preserve historical data",
    ],
    solution: [
      "Consolidated into two clean pipelines: New Business and Existing Business",
      "Standardized stages and required fields across both",
      "Connected all deals to the License object for customer context",
      "Set up dashboards for reliable forecasting",
    ],
    results: [
      { label: "Pipelines", value: "2 → unified" },
      { label: "Duplicate deals", value: "Eliminated" },
      { label: "Reporting time", value: "~50% faster" },
      { label: "Forecast reliability", value: "Improved" },
    ],
    stack: ["HubSpot", "Pipeline management", "Custom objects"],
    relatedServices: ["pipeline-optimization"],
  },
  {
    slug: "renewal-status-card",
    title: "Live renewal status in the deal sidebar — no more tab-switching",
    industry: "HR Software",
    companySize: "50-200 employees",
    summary:
      "Sales reps were manually checking License objects before every deal review to determine renewal type. A custom HubSpot app card surfaced the answer directly in the deal sidebar.",
    challenge: [
      "Growth Account Executives had to navigate to the associated License object on every deal to check whether a subscription was active, cancelled, or absent",
      "This manual lookup cost time on every deal review and was easy to skip under pressure",
      "Missed or incorrect renewal assessments led to deals being handled with the wrong approach",
    ],
    approach: [
      "Mapped the data flow from Deal to associated License object and identified the relevant subscription properties",
      "Designed a three-state card with clear color-coding: green for auto-renewal active, yellow for manual renewal required, red for subscription cancelled",
      "Built a React UI Extension with a serverless function that resolves the Deal-to-License association and fetches the subscription data",
      "Scoped the card to appear only in the relevant pipeline to avoid noise for reps working other deal types",
    ],
    solution: [
      "Reps now see the renewal status as soon as they open a deal — no navigation, no extra clicks",
      "Three color-coded states make the required action immediately clear without any training",
      "The card is read-only and runs entirely inside HubSpot's infrastructure — zero risk to existing data, nothing to maintain externally",
      "Two API calls per load keep the card fast; tested at under two seconds from open to rendered",
    ],
    results: [
      { label: "Context switching", value: "Eliminated" },
      { label: "Data lookup time", value: "Seconds vs. minutes" },
      { label: "Adoption", value: "Immediate" },
      { label: "External hosting", value: "None required" },
    ],
    stack: ["HubSpot", "UI Extensions", "Serverless functions", "Custom objects"],
    relatedServices: ["custom-app-cards", "custom-objects"],
  },
];
