export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  companySize: string;
  summary: string;
  statusNote?: string;
  narrative?: {
    eyebrow: string;
    intro: string[];
    resultsNote: string;
    headings: {
      challenge: string;
      approach: string;
      solution: string;
      operatingModel: string;
    };
    cta: { title: string; description: string };
  };
  operatingModel?: { summary: string; controls: string[] };
  challenge: string[];
  approach: Array<string | { title: string; description: string }>;
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
    title: "Connecting the full customer relationship in HubSpot",
    industry: "HR Technology",
    companySize: "50–200 employees",
    summary: "I connected AIHR's customer records through a custom Account object in HubSpot, with workflows and weekly checks to keep the data linked.",
    statusNote: "September 2026: the core setup is live. Enrichment is still in progress.",
    narrative: {
      eyebrow: "Account-Based CRM · AIHR",
      intro: [
        "At AIHR, one customer could have several company records, licenses, deals, and service projects in HubSpot. Those records weren't consistently connected, which made it difficult to see the full relationship and report on retention.",
        "I led the project to connect them through a custom Account object, including the data model, historical cleanup, and workflows. I also added weekly checks to flag duplicates and missing links after launch."
      ],
      resultsNote: "Snapshot: 7 September 2026.",
      headings: {
        challenge: "Why the existing records weren't enough",
        approach: "How I approached it",
        solution: "What's in place now",
        operatingModel: "Keeping the data connected"
      },
      cta: {
        title: "Hard to see the full customer picture in HubSpot?",
        description: "Tell me how your customer records are set up and what you're trying to report on. I can help you work out where the gaps are and what needs to change."
      }
    },
    challenge: [
      "The data was already in HubSpot, but there was no consistent way to group everything that belonged to the same customer. A deal showed part of the relationship. A license showed another part. Parent companies and subsidiaries added another question: which records belonged together?",
      "That made retention reporting difficult. Before the data team could calculate it at account level, they needed a reliable way to identify the customer across current and historical records."
    ],
    approach: [
      {
        title: "Define what belongs to an Account",
        description: "I started by defining what an Account represents and how the records should connect. One Company record didn't necessarily represent the full customer relationship, so duplicates and parent-child relationships needed review before the historical records could be linked."
      },
      {
        title: "Connect the historical data",
        description: "I backfilled the Account layer across active and historical B2B customers. Keeping the older licenses connected mattered because retention reporting needs the history as well as the current contract."
      },
      {
        title: "Build the paths for new records",
        description: "I built workflows to create or find the right Account when new licenses and professional services are added, and to link deals to it. The associated Company provides the matching point between records."
      },
      {
        title: "Add checks for missing links",
        description: "New records keep coming in after launch. I added a weekly review to catch possible duplicates and missing associations, so exceptions can be investigated as they appear."
      }
    ],
    solution: [
      "The Account object groups companies, licenses, deals, and professional services under one customer relationship. All active and historical Team Licenses are connected, and three automated paths link new records to Accounts.",
      "That gives the data team a consistent customer identifier for account-level retention reporting. The core setup is live; enrichment remains in progress."
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
      "Claude"
    ],
    relatedServices: [
      "consultancy",
      "custom-objects",
      "automation"
    ],
    operatingModel: {
      summary: "Each week, I run a check that compares new Accounts with the full account base. It looks for possible duplicates and parent-company relationships using names, domains, and previously reviewed relationships.",
      controls: [
        "The review also flags licenses and professional services without an Account, and signed deals where expected service records are missing. Claude helps me assess the exceptions and put the findings in context.",
        "If the source data is incomplete or the candidate list exceeds the expected range, the run stops for investigation. I review the findings before making changes in HubSpot. The check itself doesn't merge records or change associations."
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
