export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  companySize: string;
  summary: string;
  statusNote?: string;
  screenshots?: {
    caption: string;
    images: Array<{ src: string; alt: string; width: number; height: number }>;
  };
  narrative: {
    eyebrow: string;
    intro: string[];
    headings: {
      challenge: string;
      approach: string;
      solution: string;
      operatingModel?: string;
    };
  };
  operatingModel?: { summary: string; controls: string[] };
  architecture?: {
    title: string;
    description: string;
    account: { label: string; detail: string };
    records: Array<{ label: string; detail: string }>;
    caption: string;
  };
  challenge: string[];
  approach: string[];
  solution: string[];
  results: Array<{ label: string; value: string }>;
  stack: string[];
  relatedServices: string[]; // slugs of related services
};

export const caseStudies: CaseStudy[] = [
  {
    "slug": "customer-lifecycle",
    "title": "Connecting the full customer relationship in HubSpot",
    "industry": "HR Technology",
    "companySize": "50–200 employees",
    "summary": "I connected AIHR's customer records through a custom Account object in HubSpot, with workflows and weekly checks to keep the data linked.",
    "statusNote": "September 2026 project snapshot: the core setup is live; enrichment remains in progress.",
    "narrative": {
      "eyebrow": "Account-Based CRM \u00b7 AIHR",
      "intro": [
        "I led AIHR's Account-based CRM project, from the customer model and association design to historical cleanup, workflows and recurring review."
      ],
      "headings": {
        "challenge": "Why one Company record was not enough",
        "approach": "How I connected the records",
        "solution": "A customer layer for reporting",
        "operatingModel": "Weekly review and its limits"
      }
    },
    "challenge": [
      "One customer could have several Company records, licenses, deals and service projects. Parent companies and subsidiaries made grouping harder. The data team needed one customer identifier for retention reporting across current and historical contracts."
    ],
    "approach": [
      "I defined the Account model and association rules, reviewed duplicates and parent-child relationships, and backfilled active and historical B2B customer records. Older licenses stay linked for retention reporting.",
      "Three automated paths create or find Accounts for new licenses and professional services, and link deals. The associated Company is the matching point. The setup uses HubSpot custom objects, workflows and JavaScript."
    ],
    "solution": [
      "The Account layer gives the data team a consistent customer identifier for account-level retention reporting."
    ],
    "architecture": {
      "title": "One Account connects the customer relationship",
      "description": "The custom Account groups the records belonging to one customer. Company records anchor the matching.",
      "account": {
        "label": "Account",
        "detail": "Example Group"
      },
      "records": [
        {
          "label": "Companies",
          "detail": "Example Netherlands and Example UK"
        },
        {
          "label": "Licenses",
          "detail": "Team training license"
        },
        {
          "label": "Deals",
          "detail": "Expansion deal"
        },
        {
          "label": "Professional services",
          "detail": "Advisory engagement"
        }
      ],
      "caption": "Illustrative records with fictional names. Workflows link new records; the weekly review flags missing links and possible duplicates for investigation."
    },
    "results": [
      {
        "value": "3",
        "label": "Automated roll-up paths"
      },
      {
        "value": "Weekly",
        "label": "Account quality control"
      }
    ],
    "stack": [
      "HubSpot",
      "Custom objects",
      "Workflows",
      "JavaScript",
      "Codex",
      "Claude Code"
    ],
    "relatedServices": [
      "consultancy",
      "custom-objects",
      "automation"
    ],
    "operatingModel": {
      "summary": "I manually start a weekly check comparing new Accounts with the full account base. It looks for possible duplicates and parent-company relationships using names, domains and previously reviewed relationships.",
      "controls": [
        "It also flags licenses and professional services without an Account, and signed deals missing expected service records. Codex and Claude Code help assess candidate matches and put findings in context.",
        "Incomplete source data or an unexpectedly large candidate list stops the run for investigation. I review the findings before changing HubSpot. The check itself does not merge records or change associations."
      ]
    }
  },
  {
    "slug": "crm-data-quality",
    "title": "Finding data mismatches before fixing the wrong record",
    "industry": "HR Technology",
    "companySize": "50–200 employees",
    "summary": "At AIHR, I built a detection layer that compares HubSpot with learning-platform data through Snowflake, bringing missing links and conflicting statuses into one data quality dashboard.",
    "statusNote": "August 2026 project snapshot: datasets and dashboard are in place; member-count validation and source freshness still need follow-up.",
    "narrative": {
      "eyebrow": "Data quality monitoring \u00b7 AIHR",
      "intro": [
        "At AIHR, I built three comparison datasets and a HubSpot data quality dashboard, using Data Studio and Snowflake to investigate differences with the learning platform."
      ],
      "headings": {
        "challenge": "Start with the source of the mismatch",
        "approach": "How I designed the comparisons",
        "solution": "One view of the exceptions",
        "operatingModel": "Before correcting a record"
      }
    },
    "challenge": [
      "A contact's role, status or license membership could disagree between systems. A support request showed the symptom, but the cause could be an association, an identity mismatch or an earlier step in another system."
    ],
    "approach": [
      "Two datasets compare contacts in opposite directions: learning platform to HubSpot, and HubSpot to learning platform. Each preserves its starting population so records missing on the other side remain visible.",
      "The third compares licenses and member counts. I accounted for multiple source rows per license to keep distinct license counts separate from row counts.",
      "I defined alignment logic in the datasets and used report filters to select findings. The dashboard brings missing contacts, missing associations and inconsistent statuses together across the population."
    ],
    "solution": [
      "Teams can investigate an exception and its source before changing the record named in a support request. The dashboard detects differences; it does not automatically repair records."
    ],
    "results": [
      {
        "value": "3",
        "label": "Comparison datasets"
      },
      {
        "value": "One view",
        "label": "Data quality dashboard"
      },
      {
        "value": "Detect first",
        "label": "Investigate before correction"
      }
    ],
    "stack": [
      "HubSpot",
      "Data Studio",
      "Snowflake",
      "Learning platform"
    ],
    "relatedServices": [
      "consultancy",
      "automation",
      "integrations"
    ],
    "operatingModel": {
      "summary": "A finding starts an investigation. Check identity, associations and the authoritative source before proposing a repair or changing access.",
      "controls": [
        "An unmatched email can reflect a changed identity, a missing record or a delayed refresh. For snapshot-sensitive findings, wait for the next Snowflake refresh and check whether the difference persists.",
        "License member-count findings still need validation. Clearer source freshness is also open work, so the dashboard cannot guarantee realtime alignment. Semi-automated and fully automated repair remain follow-up work."
      ]
    }
  },
  {
    "slug": "finance-automation",
    "title": "From manual order entry to one-click invoicing",
    "industry": "HR Technology",
    "companySize": "50–200 employees",
    "summary": "At AIHR, I connected HubSpot, WooCommerce and Exact through Zapier so order details pass between systems after Finance reviews the billing information.",
    "narrative": {
      "eyebrow": "Finance automation",
      "intro": [
        "At AIHR, I connected HubSpot, WooCommerce and Exact through Zapier so order details pass between systems after Finance reviews the billing information."
      ],
      "headings": {
        "challenge": "Keep the billing decision with Finance",
        "approach": "How I connected the process",
        "solution": "What changed"
      }
    },
    "challenge": [
      "Customer and billing details were already in HubSpot. For each order, Finance copied them into WooCommerce and then into Exact for invoicing. That repeated work left room for mistakes.",
      "The process still needed a billing review, so I kept the decision to start with Finance."
    ],
    "approach": [
      "I mapped the order-to-invoice process across all three systems, checking which details each needed and when they should be passed on.",
      "I added a billing review in HubSpot and built the Zapier automation. Finance checks the details and starts the flow with one click. The automation creates the WooCommerce order and passes the information through the invoicing process in Exact."
    ],
    "solution": [
      "Order details now move between systems without being typed in again. Finance still owns the review that starts the flow."
    ],
    "results": [
      {
        "value": "Connected",
        "label": "Order details passed between systems"
      },
      {
        "value": "Finance-led",
        "label": "Billing review retained"
      },
      {
        "value": "1",
        "label": "Review step before the flow starts"
      }
    ],
    "stack": [
      "HubSpot",
      "Zapier",
      "WooCommerce",
      "Exact"
    ],
    "relatedServices": [
      "automation",
      "integrations"
    ]
  },
  {
    "slug": "renewal-status-card",
    "title": "Seeing the renewal status directly on the deal",
    "industry": "HR Technology",
    "companySize": "50–200 employees",
    "summary": "At AIHR, I built a HubSpot sidebar card that reads the linked License and shows the renewal status on the deal, so reps can check it where they're already working.",
    "screenshots": {
      "caption": "Three states of the card, each with a written status and the next step for the rep.",
      "images": [
        {
          "src": "/case-studies/renewal-status-card/auto-renewal-active.png",
          "alt": "Subscription Status card: Auto-renewal active. The subscription will renew automatically; no action is needed.",
          "width": 370,
          "height": 216
        },
        {
          "src": "/case-studies/renewal-status-card/manual-renewal-required.png",
          "alt": "Subscription Status card: Manual renewal required. No active subscription was found; a Growth AE needs to handle the renewal manually.",
          "width": 370,
          "height": 216
        },
        {
          "src": "/case-studies/renewal-status-card/subscription-cancelled.png",
          "alt": "Subscription Status card: Subscription cancelled. The customer has cancelled; the renewal deal should be Closed Lost.",
          "width": 370,
          "height": 216
        }
      ]
    },
    "narrative": {
      "eyebrow": "Renewal status card",
      "intro": [
        "At AIHR, I built a HubSpot sidebar card that reads the linked License and shows the renewal status on the deal, where reps are already working."
      ],
      "headings": {
        "challenge": "The answer was on another record",
        "approach": "How I built the card",
        "solution": "Status on the deal, without changing records"
      }
    },
    "challenge": [
      "Reps had to open the associated License to check whether a renewal needed manual follow-up. Skipping that lookup could mean missing the information needed to choose the next step."
    ],
    "approach": [
      "The initial approach did not reliably find the linked License. I moved the lookup into a serverless function that retrieves the association and reads the subscription data.",
      "I built the card as a React UI Extension, visible in the relevant deal pipeline. It reads License data when it loads, without copying those properties onto the deal."
    ],
    "solution": [
      "Reps can check the renewal status without opening the License record. The card and its serverless function run inside HubSpot. The card only reads data; it does not update records."
    ],
    "results": [
      {
        "value": "3",
        "label": "Renewal states shown on the deal"
      },
      {
        "value": "Read-only",
        "label": "No CRM records updated by the card"
      },
      {
        "value": "HubSpot",
        "label": "Card and function hosted in HubSpot"
      }
    ],
    "stack": [
      "HubSpot",
      "React UI Extensions",
      "Serverless functions",
      "Custom objects"
    ],
    "relatedServices": [
      "custom-app-cards",
      "custom-objects"
    ]
  },
  {
    "slug": "pipeline-consolidation",
    "title": "Following the sales process from MQL to Closed Won",
    "industry": "HR Technology",
    "companySize": "50–200 employees",
    "summary": "At AIHR, I consolidated several HubSpot pipelines into one, making it easier to measure conversion from MQL to Closed Won and manage internal handovers.",
    "narrative": {
      "eyebrow": "Pipeline consolidation",
      "intro": [
        "At AIHR, I consolidated several HubSpot pipelines into one, so the team can follow the sales process and measure conversion from MQL to Closed Won."
      ],
      "headings": {
        "challenge": "The sales process was split across pipelines",
        "approach": "How I brought the stages together",
        "solution": "One process for reporting and handovers"
      }
    },
    "challenge": [
      "Each pipeline showed part of the journey. Following a lead from MQL to Closed Won meant combining separate views, which made conversion reporting and internal handovers harder to manage."
    ],
    "approach": [
      "I reviewed the stages, fields and workflows across the existing pipelines, mapping overlaps against the full sales process.",
      "I designed a single pipeline with consistent stages and required fields, and planned the migration to preserve existing deal history.",
      "I set up reporting around the consolidated process, covering conversion between stages and across the full funnel."
    ],
    "solution": [
      "The team can track progress and conversion from MQL to Closed Won in one pipeline. Handovers sit within that same process, so the journey can be followed from start to finish."
    ],
    "results": [
      {
        "value": "1",
        "label": "Pipeline for the sales process"
      },
      {
        "value": "MQL → Closed Won",
        "label": "Conversion tracked across the full journey"
      }
    ],
    "stack": [
      "HubSpot",
      "Pipeline management",
      "Reporting"
    ],
    "relatedServices": [
      "pipeline-optimization"
    ]
  }
];
