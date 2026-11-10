// Every expertise area owns one line colour (assigned in globals.css via data-line).
// A case study rides the line of the area it mainly belongs to.
export const caseLine: Record<string, string> = {
  "customer-lifecycle": "custom-objects",
  "crm-data-quality": "consultancy",
  "finance-automation": "integrations",
  "renewal-status-card": "custom-app-cards",
  "pipeline-consolidation": "pipeline-optimization",
};

export const allLines = [
  "custom-objects",
  "integrations",
  "consultancy",
  "custom-app-cards",
  "automation",
  "pipeline-optimization",
];
