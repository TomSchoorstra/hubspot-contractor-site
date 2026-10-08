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
    resultsNote?: string;
    headings: {
      challenge: string;
      approach: string;
      solution: string;
      operatingModel?: string;
    };
    cta: { title: string; description: string };
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
    statusNote: "September 2026 project snapshot: the core setup is live; enrichment remains in progress.",
    narrative: {
      eyebrow: "Account-Based CRM · AIHR",
      intro: [
        "At AIHR, one customer could have several company records, licenses, deals, and service projects in HubSpot. Those records weren't consistently connected, which made it difficult to see the full relationship and report on retention.",
        "I led the project from the customer model and association design through historical cleanup and workflow implementation. I also added a weekly review to flag duplicates and missing links after launch."
      ],
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
      "The Account object groups companies, licenses, deals, and professional services under one customer relationship. Three automated paths link new records to Accounts.",
      "That gives the data team a consistent customer identifier for account-level retention reporting."
    ],
    architecture: {
      title: "One Account connects the customer relationship",
      description: "The Account is the grouping layer. Company records anchor the matching, while licenses, deals and professional services link back to the same customer relationship.",
      account: { label: "Account", detail: "Example Group" },
      records: [
        { label: "Companies", detail: "Example Netherlands and Example UK" },
        { label: "Licenses", detail: "Team training license" },
        { label: "Deals", detail: "Expansion deal" },
        { label: "Professional services", detail: "Advisory engagement" },
      ],
      caption: "Illustrative customer and records, using fictional names. Workflows link new licenses, deals and professional services to the Account; the weekly review flags missing links and potential duplicates for investigation.",
    },
    results: [
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
      "Codex",
      "Claude Code"
    ],
    relatedServices: [
      "consultancy",
      "custom-objects",
      "automation"
    ],
    operatingModel: {
      summary: "Each week, I run a check that compares new Accounts with the full account base. It looks for possible duplicates and parent-company relationships using names, domains, and previously reviewed relationships.",
      controls: [
        "The review also flags licenses and professional services without an Account, and signed deals where expected service records are missing. Codex and Claude Code help assess candidate matches and put the findings in context. I start the review manually each week.",
        "If the source data is incomplete or the candidate list exceeds the expected range, the run stops for investigation. I review the findings before making changes in HubSpot. The check itself doesn't merge records or change associations."
      ]
    }
  },
  {
    slug: "finance-automation",
    title: "From manual order entry to one-click invoicing",
    industry: "HR Software",
    companySize: "50–200 employees",
    summary: "I connected HubSpot, WooCommerce, and Exact through Zapier, reducing time spent on manual processing by 90%. Finance keeps a review step before the flow starts.",
    narrative: {
      eyebrow: "Finance automation",
      intro: [
        "Finance was spending 10–15 hours a week copying order details between HubSpot, WooCommerce, and Exact.",
        "I connected the process through Zapier, with a review step in HubSpot before Finance starts the flow. That reduced the time spent on manual processing by 90%."
      ],
      headings: {
        challenge: "The same order details, entered again",
        approach: "How I approached it",
        solution: "Finance reviews the details, then starts the flow"
      },
      cta: {
        title: "Still copying order details between systems?",
        description: "Tell me where your order data starts and what Finance needs to do with it. I can help you work out which steps can be automated and where a review still makes sense."
      }
    },
    challenge: [
      "The customer and billing details were already in HubSpot. For each new order, Finance copied them into WooCommerce and then into Exact for invoicing. That repeated entry took 10–15 hours each week and left room for mistakes.",
      "The process still needed a billing review. I needed to keep that decision with Finance while removing the repeated work around it."
    ],
    approach: [
      {
        title: "Follow the order through each system",
        description: "I mapped the order-to-invoice process across HubSpot, WooCommerce, and Exact. That established which details each system needed and when they should be passed on."
      },
      {
        title: "Keep the billing review in HubSpot",
        description: "I added a review step so Finance could check the billing details before starting the automation. The approval became the trigger for the rest of the process."
      },
      {
        title: "Connect the order and invoicing steps",
        description: "I built the Zapier automation connecting HubSpot with WooCommerce and Exact. Once Finance starts the flow, the order details are passed through without being typed into each system again."
      }
    ],
    solution: [
      "Finance checks the billing details in HubSpot and starts the flow with one click. The automation creates the WooCommerce order and passes the information through the invoicing process in Exact.",
      "Time spent on manual processing fell by 90% from the original 10–15 hours per week. Finance still reviews the order; the repeated entry between systems has been removed."
    ],
    results: [
      {
        value: "90%",
        label: "Less time spent on manual processing"
      },
      {
        value: "10–15 hrs/week",
        label: "Time spent before automation"
      },
      {
        value: "1",
        label: "Review step before the flow starts"
      }
    ],
    stack: [
      "HubSpot",
      "Zapier",
      "WooCommerce",
      "Exact"
    ],
    relatedServices: [
      "automation",
      "integrations"
    ]
  },
  {
    slug: "renewal-status-card",
    title: "Seeing the renewal status directly on the deal",
    industry: "HR Software",
    companySize: "50–200 employees",
    summary: "I built a HubSpot sidebar card that reads the linked License and shows the renewal status on the deal, so reps can check it where they're already working.",
    narrative: {
      eyebrow: "Renewal status card",
      intro: [
        "To check whether a renewal needed manual follow-up, reps had to open the associated License record. The information was already in HubSpot, but it wasn't visible on the deal they were reviewing.",
        "I built a sidebar card that reads the linked License and shows whether the subscription is active, cancelled, or missing."
      ],
      headings: {
        challenge: "The status was on a different record",
        approach: "How I approached it",
        solution: "The renewal status is visible on the deal"
      },
      cta: {
        title: "Is your team opening other records to find one answer?",
        description: "Tell me what your reps need to check and where that information lives. I can help you work out whether a sidebar card would make that task easier."
      }
    },
    challenge: [
      "Reps needed to know whether a renewal would happen automatically or needed manual follow-up. To find out, they had to leave the deal and check subscription details on the associated License.",
      "That added a lookup to each deal review. If it was skipped, the rep could miss the information needed to choose the right follow-up."
    ],
    approach: [
      {
        title: "Define the statuses reps need to see",
        description: "I mapped the subscription information to three states: auto-renewal active, manual renewal required, and subscription cancelled. Each state has a written label and a colour, so reps can read the status directly."
      },
      {
        title: "Make the License lookup reliable",
        description: "The initial approach wasn't reliably finding the linked License. I moved that lookup into a serverless function, which retrieves the association and reads the subscription data."
      },
      {
        title: "Show the card where it is useful",
        description: "I built the card as a React UI Extension and scoped its visibility to the relevant deal pipeline. It reads the License data when it loads, without copying those properties onto the deal."
      }
    ],
    solution: [
      "When a rep opens a relevant deal, the card shows whether auto-renewal is active, manual renewal is required, or the subscription has been cancelled. The rep can check that status without opening the License record.",
      "The card and its serverless function run inside HubSpot. The card only reads data; it doesn't update records."
    ],
    results: [
      {
        value: "3",
        label: "Renewal states shown on the deal"
      },
      {
        value: "Read-only",
        label: "No CRM records updated by the card"
      },
      {
        value: "HubSpot",
        label: "Card and function hosted in HubSpot"
      }
    ],
    stack: [
      "HubSpot",
      "React UI Extensions",
      "Serverless functions",
      "Custom objects"
    ],
    relatedServices: [
      "custom-app-cards",
      "custom-objects"
    ]
  },
  {
    slug: "pipeline-consolidation",
    title: "Following the sales process from MQL to Closed Won",
    industry: "HR Software",
    companySize: "50–200 employees",
    summary: "I consolidated several HubSpot pipelines into one, making it easier to measure conversion from MQL to Closed Won and manage internal handovers.",
    narrative: {
      eyebrow: "Pipeline consolidation",
      intro: [
        "The sales process was spread across several pipelines. That made it difficult to follow a lead through the full process, measure conversion between stages, and manage internal handovers.",
        "I consolidated those pipelines into one. The team can now track conversion from MQL to Closed Won, see how leads move between stages, and hand over work within the same process."
      ],
      headings: {
        challenge: "The full sales process was split across pipelines",
        approach: "How I approached it",
        solution: "One pipeline for the full process"
      },
      cta: {
        title: "Hard to follow conversion across your pipelines?",
        description: "Tell me how your sales process is split up and where handovers get difficult. I can help you work out a pipeline structure that makes progress easier to follow."
      }
    },
    challenge: [
      "Each pipeline showed part of the sales process. Looking at the full journey from MQL to Closed Won meant working across those separate views.",
      "That made it harder to measure conversion between stages and see how work passed between teams. The team needed one process it could follow and report on from start to finish."
    ],
    approach: [
      {
        title: "Map the full sales process",
        description: "I reviewed the existing stages, fields, and workflows across the pipelines. I looked at where they overlapped and how the separate parts fitted into the journey from MQL to Closed Won."
      },
      {
        title: "Bring the stages into one pipeline",
        description: "I designed a single pipeline for the full process, with consistent stages and required fields. I planned the migration so existing deal history could be preserved."
      },
      {
        title: "Make progress and handovers easier to follow",
        description: "I set up reporting around the consolidated process so the team could measure conversion between stages and across the full funnel. Keeping that work in one pipeline also made internal handovers easier to manage."
      }
    ],
    solution: [
      "The team now works from one pipeline and can measure conversion from MQL to Closed Won, as well as between the stages along the way.",
      "Internal handovers sit within that same process. The team can follow progress through the pipeline instead of piecing the journey together from separate views."
    ],
    results: [
      {
        value: "1",
        label: "Pipeline for the sales process"
      },
      {
        value: "MQL → Closed Won",
        label: "Conversion tracked across the full journey"
      }
    ],
    stack: [
      "HubSpot",
      "Pipeline management",
      "Reporting"
    ],
    relatedServices: [
      "pipeline-optimization"
    ]
  },
];
