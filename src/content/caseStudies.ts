export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  companySize: string;
  summary: string;
  statusNote?: string;
  operatingModel?: { summary: string; controls: string[] };
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
    slug: "customer-lifecycle",
    title: "From fragmented HubSpot records to one account-level source of truth",
    industry: "HR Technology",
    companySize: "50–200 employees",
    statusNote: "Core account architecture live; enrichment work continues.",
    summary: "A growing HR technology company needed one customer view across companies, licenses, deals, and professional services. I led the Account architecture, backfill, automation, and recurring controls that now keep 2,860 account records aligned.",
    challenge: [
      "Customer data was split across Company, License, Deal, and Professional Service records, with no shared account-level grouping key.",
      "A single customer could appear under multiple entities, making retention reporting and a complete customer view unreliable.",
      "Historical cleanup alone would not solve the problem, because new records and associations could drift again after launch."
    ],
    approach: [
      "Defined what an Account represents and designed the object and association model before changing live data.",
      "Reviewed duplicates and parent-child relationships, then backfilled the Account layer across active and historical B2B customers.",
      "Built creation and association paths so new Licenses, Deals, and Professional Services resolve to the correct Account automatically.",
      "Added recurring, AI-assisted controls that compare new records with the full account base and flag exceptions for human review."
    ],
    solution: [
      "A custom Account object now groups the complete commercial relationship across Companies, Licenses, Deals, and Professional Services.",
      "License, Deal, and Professional Service workflows connect new records to the correct Account through their associated Company.",
      "All active and historical Team Licenses were connected to the Account layer, creating a stable grouping key for account-level retention reporting.",
      "A weekly control checks Account quality and association coverage without making automatic CRM changes."
    ],
    results: [
      {
        value: "2,860",
        label: "Account records live"
      },
      {
        value: "All",
        label: "Active and historical team licenses connected"
      },
      {
        value: "3",
        label: "Automated roll-up paths"
      },
      {
        value: "Weekly",
        label: "Account quality control"
      }
    ],
    stack: [
      "HubSpot",
      "Custom objects",
      "Workflows",
      "JavaScript",
      "AI-assisted controls"
    ],
    relatedServices: [
      "consultancy",
      "custom-objects",
      "automation"
    ],
    operatingModel: {
      summary: "The build is backed by a weekly, AI-assisted control loop. It checks the complete account base, explains exceptions, and keeps CRM changes behind a human decision.",
      controls: [
        "Compare every new Account with the full account base using names, domains, and known parent relationships.",
        "Check Team Licenses, signed Deals, and Professional Services for missing or incomplete Account coverage.",
        "Stop the run when source data is incomplete or the number of candidates exceeds the expected range.",
        "Return a short decision list while merges and association changes remain manual."
      ]
    }
  },
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
];
