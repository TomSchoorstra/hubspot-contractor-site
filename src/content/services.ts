export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  outcomes: string[];
  deliverables: string[];
  process: Array<{ title: string; description: string }>;
  faq: Array<{ q: string; a: string }>;
  metaDescription?: string;
  relatedCaseStudy?: string; // slug of a related case study
  references?: Array<{ label: string; href: string }>;
};

export const servicesHeroIntro =
  "Practical help for B2B teams with an existing HubSpot setup: understand the customer model, connect the processes and make operational exceptions easier to investigate.";

export const services: Service[] = [
  {
    slug: "automation",
    title: "HubSpot automation",
    shortDescription:
      "Connect operational handovers with workflows, review points and checks for exceptions.",
    metaDescription:
      "HubSpot workflow design and implementation for B2B teams: connect handovers, reduce repeated entry and document how to investigate exceptions.",
    outcomes: [
      "Less time spent on repetitive manual tasks like data entry, follow-ups, and internal handoffs.",
      "Faster lead response times through automated routing and notification workflows.",
      "Clear handovers and exception checks so the team can investigate records that need attention.",
      "Clear visibility into what's automated and where bottlenecks remain.",
    ],
    deliverables: [
      "Audit of your current workflows and manual processes.",
      "Workflow design documents outlining triggers, actions, and logic.",
      "Built and tested HubSpot workflows ready for production.",
      "Internal notifications and task assignments where needed.",
      "Documentation so your team can maintain and adjust workflows independently.",
      "A review checklist for missing associations, failed handovers and other agreed exceptions.",
    ],
    process: [
      {
        title: "Discovery",
        description:
          "I map out your current processes to understand where time is being lost and which tasks are candidates for automation.",
      },
      {
        title: "Design",
        description:
          "Together we define the workflow logic — triggers, conditions, and actions — so nothing gets built without your sign-off.",
      },
      {
        title: "Implementation",
        description:
          "I build and test the workflows in HubSpot, using a staged approach to avoid disrupting your live environment.",
      },
      {
        title: "Optimization",
        description:
          "After launch, I monitor performance and fine-tune based on real data — adjusting triggers, timing, or logic as needed.",
      },
    ],
    faq: [
      {
        q: "How long does implementation take?",
        a: "Most automation projects take 2-4 weeks depending on complexity. A simple lead routing workflow can be live in days, while a multi-step process across teams takes longer to map and test properly.",
      },
      {
        q: "What HubSpot tier do I need?",
        a: "Workflow availability depends on the Hub and the actions you need. Custom code actions require Data Hub Professional or Enterprise. I check your subscription and the required objects and actions before designing the flow.",
      },
      {
        q: "Can you integrate with our existing systems?",
        a: "Yes — if your tools connect via Zapier, native HubSpot integrations, or APIs, I can include them in the automation flow. Common integrations include Slack, Exact, WooCommerce, and Google Workspace.",
      },
    ],
    relatedCaseStudy: "finance-automation",
    references: [{ label: "HubSpot: custom code actions and subscription requirements", href: "https://developers.hubspot.com/docs/api-reference/legacy/automation/workflow-actions/custom-code-actions" }],
  },
  {
    slug: "consultancy",
    title: "HubSpot consultancy",
    shortDescription:
      "Review your CRM architecture, data quality and workflows, then agree on what to improve first.",
    metaDescription:
      "HubSpot consultancy for B2B teams with complex CRM setups. Review customer relationships, data quality and workflows, with a practical implementation roadmap.",
    outcomes: [
      "A clear picture of what's working in your HubSpot portal and what's holding you back.",
      "Actionable recommendations prioritized by impact — not a 50-page report that collects dust.",
      "Alignment between marketing, sales, and ops on how HubSpot should support your processes.",
    ],
    deliverables: [
      "Portal review covering the customer model, object associations, data quality, workflows and reporting.",
      "Recommendations for recurring checks and a review process for operational exceptions.",
      "Prioritized list of recommendations with effort-vs-impact scoring.",
      "Strategic roadmap for the next 3-6 months.",
      "Hands-on sparring sessions to work through questions and decisions together.",
      "Follow-up documentation summarizing decisions and next steps.",
    ],
    process: [
      {
        title: "Audit",
        description:
          "I review the customer model, associations, source ownership and workflows to identify gaps in the process and data.",
      },
      {
        title: "Strategy",
        description:
          "Based on the audit, I develop a recommendation plan that aligns your HubSpot setup with your actual business goals.",
      },
      {
        title: "Roadmap",
        description:
          "We prioritize together — what to fix now, what to plan for next quarter, and what to leave alone.",
      },
      {
        title: "Support",
        description:
          "I stay available for follow-up questions, implementation guidance, or hands-on execution if needed.",
      },
    ],
    faq: [
      {
        q: "What's included in an audit?",
        a: "I review your portal structure, customer relationships, data quality, pipelines, workflows and reporting. We agree on scope and timing first. You get findings with prioritized recommendations and a clear distinction between record corrections and structural changes.",
      },
      {
        q: "Do you offer ongoing support?",
        a: "Yes. We can agree on ongoing sparring, troubleshooting or incremental improvements after a portal review, with scope and responsibilities defined together.",
      },
    ],
    relatedCaseStudy: "crm-data-quality",
  },
  {
    slug: "integrations",
    title: "Zapier & integrations",
    shortDescription:
      "Connect HubSpot to Exact, WooCommerce, Google Workspace, and the rest of your stack.",
    metaDescription:
      "HubSpot integrations via Zapier and native connectors. I connect HubSpot to Exact, WooCommerce, Google Workspace, and more — documented, tested, and built to last.",
    outcomes: [
      "Data flows automatically between HubSpot and your other tools — no more manual copying between systems.",
      "A single source of truth for customer data, regardless of where it originates.",
      "Less room for human error in data entry and cross-system updates.",
      "Integrations that are documented, maintainable, and easy for your team to understand.",
    ],
    deliverables: [
      "Integration architecture showing which systems connect and how data flows.",
      "Zapier automations or native integrations built and tested end-to-end.",
      "Field mapping documentation for every connected system.",
      "Error handling and notification setup so issues get caught early.",
      "Handover documentation for your team to manage and troubleshoot.",
    ],
    process: [
      {
        title: "Discovery",
        description:
          "I map your current tool stack and understand which data needs to move where — and what's currently being done manually.",
      },
      {
        title: "Mapping",
        description:
          "I design the integration logic: field mappings, sync direction, trigger points, and how to handle edge cases.",
      },
      {
        title: "Implementation",
        description:
          "I build the integrations in Zapier or via native connectors, using a staged approach with test data before going live.",
      },
      {
        title: "Testing",
        description:
          "Every integration is tested with real-world scenarios to make sure data arrives correctly and edge cases are handled.",
      },
    ],
    faq: [
      {
        q: "What tools can you integrate with HubSpot?",
        a: "Any tool that supports Zapier, webhooks, or a REST API. Common examples include Exact, WooCommerce, Google Workspace, Slack, Jira, and various custom backends.",
      },
      {
        q: "Do you use native integrations or Zapier?",
        a: "It depends on the use case. Native integrations are preferred when they cover your requirements. Zapier is used when you need more flexibility, multi-step logic, or the native option is too limited.",
      },
      {
        q: "How do you handle data mapping?",
        a: "I create a detailed field mapping document that shows exactly which fields sync between systems, in which direction, and how conflicts are resolved. This becomes part of your documentation.",
      },
    ],
    relatedCaseStudy: "finance-automation",
  },
  {
    slug: "custom-objects",
    title: "Custom object development",
    shortDescription:
      "Model the customer relationship with custom objects, clear associations and paths for new records.",
    metaDescription:
      "HubSpot custom object development for Enterprise portals. I design data models that reflect your business, build clean associations, and set up reporting dashboards on your custom data.",
    outcomes: [
      "A data model that reflects your actual business — not one that forces you to work around HubSpot's defaults.",
      "Clean associations between custom objects and standard HubSpot records (contacts, companies, deals).",
      "Reporting and dashboards built on your custom data — not workarounds with spreadsheets.",
      "A documented structure and association rules that can evolve as your customer relationships change.",
    ],
    deliverables: [
      "Requirements document outlining the business logic and data relationships.",
      "Schema design with object definitions, properties, and association labels.",
      "Custom objects built and configured in your HubSpot portal.",
      "Association setup connecting custom objects to existing records.",
      "Rules for linking new records and checking missing associations after rollout.",
      "Custom views and filters so your team can find records quickly.",
      "Reporting dashboards using custom object data.",
    ],
    process: [
      {
        title: "Requirements",
        description:
          "I work with your team to understand the business logic — what data you need to track, how records relate, and what you need to report on.",
      },
      {
        title: "Schema design",
        description:
          "I design the object schema: properties, associations, and naming conventions — documented clearly before any building starts.",
      },
      {
        title: "Development",
        description:
          "I create the custom objects in HubSpot, set up associations, configure views, and build any automation that depends on the new data structure.",
      },
      {
        title: "Testing & rollout",
        description:
          "I test with sample data, migrate existing records if needed, and train your team on how to use and maintain the new objects.",
      },
    ],
    faq: [
      {
        q: "What HubSpot tier supports custom objects?",
        a: "Custom objects require an eligible Enterprise subscription. I check your plan and object limits before we choose the model. We also evaluate whether standard objects and associations already cover the relationship you need.",
      },
      {
        q: "Can you migrate existing data?",
        a: "Yes. I can migrate data from spreadsheets, other CRM fields, or external systems into your new custom objects — including mapping associations to existing records.",
      },
      {
        q: "How do custom objects affect reporting?",
        a: "Custom objects unlock new reporting dimensions. You can build dashboards that show metrics across your custom data, filter by associations, and create reports that weren't possible with standard objects alone.",
      },
    ],
    relatedCaseStudy: "customer-lifecycle",
    references: [{ label: "HubSpot: create and edit custom objects", href: "https://knowledge.hubspot.com/object-settings/create-custom-objects" }],
  },
  {
    slug: "pipeline-optimization",
    title: "Pipeline reviews & optimization",
    shortDescription:
      "Clean pipelines, consistent processes, forecasts you can trust.",
    metaDescription:
      "HubSpot pipeline optimization for sales teams. I clean up deal stages, standardize fields, and build forecasting dashboards your leadership team can actually rely on.",
    outcomes: [
      "Pipeline stages that reflect your actual sales process — not a default template.",
      "Required fields and validation rules that keep data clean without slowing reps down.",
      "Forecasting dashboards your leadership team can actually rely on.",
    ],
    deliverables: [
      "Pipeline audit covering stages, deal flow, field usage, and data quality.",
      "Recommended pipeline structure with clear stage definitions and exit criteria.",
      "Required fields and deal properties configured per stage.",
      "Dashboards for pipeline health, conversion rates, and revenue forecasting.",
      "Documentation of the new pipeline structure and guidelines for the team.",
    ],
    process: [
      {
        title: "Review",
        description:
          "I analyze your current pipelines — stages, field usage, deal velocity, and where deals stall or get lost.",
      },
      {
        title: "Recommendations",
        description:
          "I present a clear recommendation: which stages to keep, merge, or remove, and what data to require at each step.",
      },
      {
        title: "Implementation",
        description:
          "I restructure the pipelines in HubSpot, migrate existing deals, and set up the required fields and automation.",
      },
      {
        title: "Monitoring",
        description:
          "After rollout, I check pipeline health metrics and adjust stage definitions or field requirements based on real usage.",
      },
    ],
    faq: [
      {
        q: "What pipelines can you optimize?",
        a: "Deals pipelines (new business, renewals, upsells), tickets pipelines, and any custom pipelines. The approach works for both sales and service teams.",
      },
      {
        q: "How often should pipelines be reviewed?",
        a: "At minimum every 6 months, or whenever your sales process changes significantly — new product lines, team growth, or market shifts are all good triggers for a review.",
      },
    ],
    relatedCaseStudy: "pipeline-consolidation",
  },
  {
    slug: "custom-app-cards",
    title: "HubSpot custom app cards",
    shortDescription:
      "Custom sidebar cards that surface live CRM data where your team actually works — inside HubSpot.",
    metaDescription:
      "Custom HubSpot app cards that show relevant CRM context on a record. React-based interfaces with data access designed for your platform and subscription.",
    outcomes: [
      "Live, contextual data visible directly in the deal or contact sidebar — no switching between tabs, reports, or external tools.",
      "Custom UI that matches your team's workflow, showing exactly the data points that matter for each record.",
      "A hosting and data-access approach matched to your HubSpot platform version, subscription and integration needs.",
      "Reduced reliance on workaround workflows, manual lookups, and dashboard-hopping to get operational context.",
    ],
    deliverables: [
      "Discovery session to identify which data points your team needs at a glance and where they currently go to find them.",
      "Card design spec covering layout, data sources, status logic, and color-coding rules.",
      "React-based UI Extension built and tested in a HubSpot sandbox environment.",
      "Serverless functions to fetch and process data from associated objects and properties.",
      "Production deployment with verification on live records.",
      "Documentation covering the card's data sources, logic, and how to request changes.",
    ],
    process: [
      {
        title: "Discovery",
        description:
          "I identify which data points your team needs at a glance and map out where that data currently lives in your portal.",
      },
      {
        title: "Design",
        description:
          "We define the card layout, data sources, status logic, and color-coding rules before writing any code.",
      },
      {
        title: "Development",
        description:
          "I build the React UI Extension and serverless functions inside HubSpot's platform, testing against sandbox data.",
      },
      {
        title: "Rollout",
        description:
          "I deploy to production, verify with live records, configure visibility rules, and hand over documentation.",
      },
    ],
    faq: [
      {
        q: "What HubSpot plan do I need?",
        a: "Requirements depend on the card and its data access. On the 2026.03 platform, private app functions require an Enterprise subscription or a free developer test account. I verify your subscription, platform version and scopes before choosing an implementation.",
      },
      {
        q: "Can the card pull data from custom objects?",
        a: "Yes, where the app has the required object access and scopes. My renewal-status card reads the associated License and displays its subscription status on the deal. We agree on the source and handle missing associations explicitly.",
      },
      {
        q: "Does this require external hosting or infrastructure?",
        a: "HubSpot can host the interface and, on eligible plans and platform versions, app functions. Some integrations use an external backend. We confirm hosting, limits, costs and maintenance responsibilities during design instead of assuming the card is maintenance-free.",
      },
      {
        q: "What kinds of cards can you build?",
        a: "Any card that surfaces data your team needs while reviewing a record. Common examples: renewal or subscription status on deals, customer health scores on companies, contract expiration warnings, payment status from billing objects, onboarding progress, open support ticket summaries, compliance approval status, and cross-sell indicators based on purchased products.",
      },
    ],
    relatedCaseStudy: "renewal-status-card",
    references: [
      { label: "HubSpot: UI extensions overview", href: "https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensions/overview" },
      { label: "HubSpot: 2026.03 platform and app function requirements", href: "https://developers.hubspot.com/changelog/spring-2026-spotlight" },
    ],
  },
];
