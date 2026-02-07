export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  outcomes: string[];
  deliverables: string[];
  process: Array<{ title: string; description: string }>;
  faq: Array<{ q: string; a: string }>;
};

export const servicesHeroIntro =
  "Building a HubSpot setup that actually works for your team, not against it. Whether you're implementing HubSpot for the first time or untangling years of workarounds, I help SMBs and scale-ups build a solid foundation for growth.";

export const services: Service[] = [
  {
    slug: "automation",
    title: "HubSpot automation",
    shortDescription:
      "Workflows that handle the busywork so your team can focus on selling.",
    outcomes: [
      "Less time spent on repetitive manual tasks like data entry, follow-ups, and internal handoffs.",
      "Faster lead response times through automated routing and notification workflows.",
      "Consistent processes across the team — no more deals falling through the cracks.",
      "Clear visibility into what's automated and where bottlenecks remain.",
    ],
    deliverables: [
      "Audit of your current workflows and manual processes.",
      "Workflow design documents outlining triggers, actions, and logic.",
      "Built and tested HubSpot workflows ready for production.",
      "Internal notifications and task assignments where needed.",
      "Documentation so your team can maintain and adjust workflows independently.",
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
        a: "Basic workflows are available on Professional plans. More advanced branching logic, custom code actions, and operations workflows require Operations Hub Professional or Enterprise.",
      },
      {
        q: "Can you integrate with our existing systems?",
        a: "Yes — if your tools connect via Zapier, native HubSpot integrations, or APIs, I can include them in the automation flow. Common integrations include Slack, Exact, WooCommerce, and Google Workspace.",
      },
    ],
  },
  {
    slug: "consultancy",
    title: "HubSpot consultancy",
    shortDescription:
      "Sparring partner for your operational, tactical, and strategic HubSpot questions.",
    outcomes: [
      "A clear picture of what's working in your HubSpot portal and what's holding you back.",
      "Actionable recommendations prioritized by impact — not a 50-page report that collects dust.",
      "Alignment between marketing, sales, and ops on how HubSpot should support your processes.",
    ],
    deliverables: [
      "Portal audit covering data quality, workflows, pipelines, and property usage.",
      "Prioritized list of recommendations with effort-vs-impact scoring.",
      "Strategic roadmap for the next 3-6 months.",
      "Hands-on sparring sessions to work through questions and decisions together.",
      "Follow-up documentation summarizing decisions and next steps.",
    ],
    process: [
      {
        title: "Audit",
        description:
          "I review your portal setup, data model, workflows, and reporting to identify quick wins and structural issues.",
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
        a: "I review your portal structure, data quality, pipelines, workflows, properties, and reporting. You get a written summary of findings with prioritized recommendations — typically delivered within 1-2 weeks.",
      },
      {
        q: "Do you offer ongoing support?",
        a: "Yes. Many clients start with a one-off audit and then move to a recurring arrangement — typically a set number of hours per month for sparring, troubleshooting, and incremental improvements.",
      },
    ],
  },
  {
    slug: "integrations",
    title: "Zapier & integrations",
    shortDescription:
      "Connect HubSpot to Exact, WooCommerce, Google Workspace, and the rest of your stack.",
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
  },
  {
    slug: "custom-objects",
    title: "Custom object development",
    shortDescription:
      "Data structures that match how your business actually works.",
    outcomes: [
      "A data model that reflects your actual business — not one that forces you to work around HubSpot's defaults.",
      "Clean associations between custom objects and standard HubSpot records (contacts, companies, deals).",
      "Reporting and dashboards built on your custom data — not workarounds with spreadsheets.",
      "A scalable structure that grows with your business without needing a rebuild.",
    ],
    deliverables: [
      "Requirements document outlining the business logic and data relationships.",
      "Schema design with object definitions, properties, and association labels.",
      "Custom objects built and configured in your HubSpot portal.",
      "Association setup connecting custom objects to existing records.",
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
        a: "Custom objects are available on Enterprise plans. If you're on Professional, I can help evaluate whether custom objects are the right solution or if an alternative approach works better for your tier.",
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
  },
  {
    slug: "pipeline-optimization",
    title: "Pipeline reviews & optimization",
    shortDescription:
      "Clean pipelines, consistent processes, forecasts you can trust.",
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
  },
];
