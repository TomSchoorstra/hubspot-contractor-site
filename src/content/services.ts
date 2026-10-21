export type Service = {
  slug: string;
  title: string;
  indexDescription: string;
  shortDescription: string;
  metaDescription: string;
  deliverables: string[];
  relatedCaseStudy: string;
  references?: Array<{ label: string; href: string }>;
  compact: {
    headings: { scope: string; approach: string; boundaries: string };
    proofContext: string;
    proofLabel: string;
    scopeIntro: string;
    approach: string[];
    boundaries: string[];
  };
};

export const servicesHeroIntro =
  "My work covers the structure of a CRM, the processes around it and the information people need on a record. These pages explain the scope, practical examples and platform considerations.";

export const services: Service[] = [
  {
    "slug": "automation",
    "title": "HubSpot automation",
    "indexDescription": "Workflow logic and exception checks for recurring handovers and repeated data entry.",
    "shortDescription": "I build HubSpot workflows that connect handovers, reduce repeated entry and make exceptions easier to follow up.",
    "metaDescription": "Explore my HubSpot automation work: workflow logic, review points, testing and exception checks, with a Finance-led order flow as a practical example.",
    "deliverables": [
      "Workflow review: which routing and follow-up tasks need a flow, and where repeated data entry can be reduced.",
      "Triggers and logic: enrollment rules, conditions, notifications and task assignments, with clear review points.",
      "Testing: sample records, missing associations and failed handovers, including what needs manual attention.",
      "Handover: documented workflow logic and a checklist the team can use to investigate exceptions."
    ],
    "compact": {
      "headings": {
        "scope": "What I build",
        "approach": "Testing and follow-up",
        "boundaries": "Platform and ownership"
      },
      "proofContext": "I connected HubSpot, WooCommerce and Exact through Zapier, with a Finance review before the order flow starts.",
      "proofLabel": "See the Finance automation case",
      "scopeIntro": "Automation starts with the process people follow and the points where work gets stuck. The scope can include:",
      "approach": [
        "I agree the logic with the team before building, then test the paths and exceptions in stages. Timing depends on the process and systems involved.",
        "After rollout, I check how the flow behaves with real records and adjust the agreed rules when the process changes."
      ],
      "boundaries": [
        "I check the HubSpot subscription and the required workflow actions before designing the flow. Custom code actions need Data Hub Professional or Enterprise.",
        "Connections to other tools depend on their connectors or APIs. Access, monitoring and responsibility for manual review are part of the scope."
      ]
    },
    "relatedCaseStudy": "finance-automation",
    "references": [
      {
        "label": "HubSpot: custom code actions and plan requirements",
        "href": "https://developers.hubspot.com/docs/api-reference/legacy/automation/workflow-actions/custom-code-actions"
      }
    ]
  },
  {
    "slug": "consultancy",
    "title": "HubSpot consultancy",
    "shortDescription": "I review how a HubSpot setup supports the work around it, from customer records to handovers between teams.",
    "metaDescription": "My approach to HubSpot consultancy: reviewing CRM structure, data quality and workflows, then prioritizing changes. See the scope and a practical example.",
    "deliverables": [
      "Customer model and associations: how records relate to each other.",
      "Data quality and source ownership: where values conflict and how exceptions are reviewed.",
      "Workflows and handovers: triggers, dependencies and records that need attention.",
      "Pipelines and reporting: whether the pipeline reflects the process and reports answer the team's questions."
    ],
    "compact": {
      "proofContext": "At AIHR, I built a dashboard for investigating missing links and conflicting data. The case covers the review process and remaining validation work.",
      "proofLabel": "See the data quality case",
      "scopeIntro": "Missing links, inconsistent data and manual workarounds are useful starting points. A review covers:",
      "boundaries": [
        "I define scope and timing first. A review produces recommendations; implementation and ongoing support need their own scope, permissions and responsibilities. Available features and subscription limits shape what is practical."
      ],
      "headings": {
        "scope": "What I look at",
        "approach": "What comes out of a review",
        "boundaries": "Before making changes"
      },
      "approach": [
        "A prioritized list of findings, with effort and impact considered together. I separate individual record corrections from structural changes and document the decisions.",
        "I work through the options with the team and map out what to address first. The roadmap covers the next few months, with recurring checks and clear follow-up ownership."
      ]
    },
    "relatedCaseStudy": "crm-data-quality",
    "indexDescription": "A review of CRM structure and data quality, with priorities and a practical roadmap."
  },
  {
    "slug": "integrations",
    "title": "HubSpot integrations",
    "indexDescription": "Field mappings and source ownership for data moving between HubSpot and other systems.",
    "shortDescription": "I connect HubSpot with the systems around it, with explicit field mappings, source ownership and a plan for failed updates.",
    "metaDescription": "My approach to HubSpot integrations with Zapier, native connectors and APIs: field mapping, source ownership, testing and a documented way to handle failures.",
    "deliverables": [
      "Data ownership: which system is responsible for each field and which records should match.",
      "Field mapping: identifiers, sync direction and how conflicting values are handled.",
      "Flow logic: triggers and dependent steps, including review before an update is sent.",
      "Exception handling: failed or duplicate updates, with alerts and a documented way to investigate them."
    ],
    "compact": {
      "headings": {
        "scope": "What I connect",
        "approach": "Testing and handover",
        "boundaries": "Access and ownership"
      },
      "proofContext": "In the order-to-invoice flow, I connected HubSpot, WooCommerce and Exact through Zapier. Finance keeps the decision to start the process.",
      "proofLabel": "See the order-to-invoice case",
      "scopeIntro": "A native connector may cover the need. I use Zapier or a custom API connection when the required flow calls for it.",
      "approach": [
        "I test the mapping with representative records and edge cases before rollout. That includes missing identifiers and updates arriving in an unexpected order.",
        "The handover records the mappings and operating instructions, so the team knows where to look when systems disagree."
      ],
      "boundaries": [
        "A connector or API does not guarantee that a tool supports the needed operation. I check permissions, API limits and subscription requirements before choosing the route.",
        "Access credentials, connector costs and ongoing maintenance need clear owners. I agree which system can overwrite a value and where human approval remains necessary."
      ]
    },
    "relatedCaseStudy": "finance-automation"
  },
  {
    "slug": "custom-objects",
    "title": "HubSpot custom objects",
    "indexDescription": "Customer models and association rules when the standard CRM objects do not cover the relationship.",
    "shortDescription": "I design HubSpot data models for relationships that need more than the standard CRM objects can represent.",
    "metaDescription": "Explore my HubSpot custom object work: customer models, associations, migration, reporting and recurring checks, with Enterprise requirements made explicit.",
    "deliverables": [
      "Data model: object definitions and properties, with association labels and naming conventions.",
      "Record paths: links to existing contacts, companies and deals, plus rules for newly created records.",
      "Migration: field mapping and association checks for existing records, including spreadsheet imports where appropriate.",
      "Daily use: views and filters, reporting and checks for missing associations after rollout."
    ],
    "compact": {
      "headings": {
        "scope": "What I model",
        "approach": "Testing and rollout",
        "boundaries": "Platform and scope"
      },
      "proofContext": "I led AIHR's Account-based CRM project, linking licenses, deals and professional services through a custom Account object. The case includes its September 2026 snapshot and remaining enrichment work.",
      "proofLabel": "See the Account-based CRM case",
      "scopeIntro": "I start by checking whether standard objects and associations already describe the relationship. When a custom object is justified, the work covers:",
      "approach": [
        "I configure and test the model with sample data before migrating existing records. I document the structure and work through how the team will use and maintain it.",
        "For the Account project, recurring reviews help investigate potential duplicates and missing links. The review supports decisions; it does not automatically repair records."
      ],
      "boundaries": [
        "Custom objects need an eligible HubSpot Enterprise subscription. I check object and property limits, permissions and the reporting requirements before committing to the model.",
        "Standard objects may offer features a custom object cannot replace. Scope, rollout responsibility and ongoing review need to be agreed before changes are made."
      ]
    },
    "relatedCaseStudy": "customer-lifecycle",
    "references": [
      {
        "label": "HubSpot: custom object requirements and limitations",
        "href": "https://knowledge.hubspot.com/object-settings/create-custom-objects"
      }
    ]
  },
  {
    "slug": "pipeline-optimization",
    "title": "HubSpot pipeline reviews",
    "indexDescription": "Stage definitions, deal data and reporting that follow the team's actual process.",
    "shortDescription": "I review pipeline structure and deal data so stages reflect the real process and handovers are easier to follow.",
    "metaDescription": "My approach to HubSpot pipeline reviews: stage definitions, field use, deal migration and reporting, with a practical pipeline consolidation example.",
    "deliverables": [
      "Stages and exit criteria: what each stage means and what must happen before a deal moves on.",
      "Field use: required deal properties per stage, and the gaps that make the next step unclear.",
      "Configuration: the proposed structure, migration of existing deals and any dependent automation.",
      "Reporting: pipeline health and conversion views, with the assumptions behind any revenue forecast made explicit."
    ],
    "compact": {
      "headings": {
        "scope": "What I review",
        "approach": "Rollout and monitoring",
        "boundaries": "Scope and platform"
      },
      "proofContext": "I consolidated several HubSpot pipelines into one process from MQL to Closed Won, so the team could follow progress and handovers in one place.",
      "proofLabel": "See the pipeline consolidation case",
      "scopeIntro": "The starting point is how the team works today and where deals stop moving. A review covers:",
      "approach": [
        "I work through the stage definitions with the team, then test the new structure and field requirements before rollout. The handover includes process guidelines and reporting definitions.",
        "After rollout, I check how stages and required fields are used. A process change or a growing queue of stuck deals is a reason to review the setup."
      ],
      "boundaries": [
        "The approach can apply to deal or ticket pipelines. Available rules, automation and reporting depend on the HubSpot subscription and object type.",
        "I define scope, permissions and migration responsibility before changing live records. Better stage definitions support reporting; forecasts still depend on the underlying data and assumptions."
      ]
    },
    "relatedCaseStudy": "pipeline-consolidation",
    "references": [
      {
        "label": "HubSpot: pipeline settings and subscription requirements",
        "href": "https://knowledge.hubspot.com/object-settings/set-up-and-customize-pipelines"
      }
    ]
  },
  {
    "slug": "custom-app-cards",
    "title": "HubSpot custom app cards",
    "indexDescription": "Relevant context on a HubSpot record, with clear status labels and a defined data-access approach.",
    "shortDescription": "I build HubSpot app cards that bring relevant information onto the record, with clear status labels and an explicit data-access design.",
    "metaDescription": "Explore my HubSpot app card work: React interfaces, associated data and status logic, with explicit hosting, access and maintenance requirements.",
    "deliverables": [
      "Design: record location, data sources and status labels with colour rules.",
      "Access: associated objects and scopes, with explicit handling for missing records.",
      "Build: a React UI Extension and appropriate data-fetching route, tested in a development or sandbox environment.",
      "Rollout: verify the card on live records and document the visibility rules and change process."
    ],
    "compact": {
      "headings": {
        "scope": "What the card includes",
        "approach": "Testing and maintenance",
        "boundaries": "Hosting and access"
      },
      "proofContext": "My renewal-status card reads the linked License and displays its status on a deal. The card is read-only, with its function hosted in HubSpot for that implementation.",
      "proofLabel": "See the renewal-status card case",
      "scopeIntro": "I start with the question someone needs to answer on a record. The work includes:",
      "approach": [
        "I test the status logic and the paths for missing or unavailable data. Written labels explain each status alongside its colour.",
        "Documentation covers the sources, permissions and maintenance owner, including how changes to fields or associations affect the card."
      ],
      "boundaries": [
        "Data access and hosting depend on the subscription and platform version. Some integrations use an external backend, with its own costs and maintenance.",
        "On platform 2026.03, private app functions need an Enterprise subscription or a free developer test account. I confirm scopes and runtime limits, and agree whether the card reads data or can write changes."
      ]
    },
    "relatedCaseStudy": "renewal-status-card",
    "references": [
      {
        "label": "HubSpot: UI extensions and data access",
        "href": "https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensions/overview"
      },
      {
        "label": "HubSpot: 2026.03 app function requirements",
        "href": "https://developers.hubspot.com/changelog/spring-2026-spotlight"
      }
    ]
  }
];
