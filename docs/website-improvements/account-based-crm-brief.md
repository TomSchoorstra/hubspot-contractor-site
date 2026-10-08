# Content brief: When a Company record is no longer enough

Working title: **When a Company record is no longer enough: account-based CRM in HubSpot**
Status: briefing only; not published. Prepared 8 October 2026.
Author: Tom Schoorstra. Language: English.

## Reader and purpose

For CRM owners and RevOps teams managing customer groups with multiple legal entities, subscriptions and commercial relationships. The central question is: **When does a customer relationship need a layer above individual Company records, and how should that layer work?**

Informational intent. Help readers make a modelling decision before choosing a custom object. The CTA points to the account-based CRM case, then the existing custom objects service.

## Search and editorial direction

- Primary keyword hypothesis: account-based CRM HubSpot.
- Secondary hypotheses: HubSpot account hierarchy, HubSpot custom objects, parent company customer model.
- Question queries: Is a parent Company enough? When should I create an Account custom object? How do I associate deals and licenses with an Account?
- These are editorial hypotheses, not measured search volumes or verified ranking positions.
- Template: how-to-guide, adapted into a decision guide; approximately 1,400–1,800 words, six H2 sections, three FAQ questions.
- Proposed slug: `hubspot-account-based-crm-model`. Confirm uniqueness when writing.
- SEO title draft: Account-based CRM in HubSpot: beyond Company records.
- Meta description draft: Decide when an Account layer makes sense in HubSpot, how it connects customer records, and which association rules need ownership and review.

## Answer-first summary draft

> An Account layer can make sense when one customer relationship spans several companies, licenses and deals. Start with the relationship your team needs to manage, then test whether standard Company relationships cover it. A custom object adds flexibility, but also creates association rules and ongoing review responsibilities.

## Outline

1. **What customer relationship are you trying to represent?** (200–250 words)
   Distinguish a legal entity, a commercial customer group and the operational records belonging to it. State that this is a modelling choice, not a universal HubSpot recommendation.
2. **When can Company records and associations cover the need?** (200–250)
   Explain the simpler alternative, existing association labels and reporting requirements. Verify current capabilities in official documentation. Do not frame a custom object as the default.
3. **When does a separate Account layer make sense?** (250–300)
   Explain multiple operating entities and commercial relationships. Define an Account in plain language. Identify who owns it and which object is authoritative for each field.
4. **How do you connect the records?** (250–300)
   Use a fictional Example Group with Example NL and Example UK, a training license, an expansion deal and an advisory engagement. Explain association paths, ambiguous matches and records that should remain unlinked pending review.
5. **What needs ongoing review?** (200–250)
   Account discovery, incorrect or missing associations, enrichment and exception ownership. A September 2026 project snapshot documents implemented core paths; enrichment remained open.
6. **What should you check before building?** (150–200)
   Decision checklist: standard model fit, current subscription entitlement, reporting, ownership, migration and review capacity. Close with case and service links.

Introduction: 80–120 words; FAQ: 150–200 words. Answer each heading directly before the explanation.

## Practical evidence and originality

Use evidence register B2–B3 in [plan.md](plan.md). Describe Tom's project lead contribution and explain why the Account layer was useful in this situation. The article teaches the modelling decision; the case retains the project narrative. Do not repeat its full copy.

One accessible diagram can reuse the fictional Account/Company/License/Deal/Professional Services structure. Add a caption and a prose equivalent. No production screenshots, customer identifiers or internal URLs.

No measured savings, account totals, complete coverage or universal account hierarchy claim. Explain the weekly review briefly and link to the future AI-review article only after it exists.

## Sources and writing checks

- Official product reference: [Create custom objects](https://knowledge.hubspot.com/object-settings/create-custom-objects). Recheck eligible subscriptions and limitations when writing.
- Research still needed: current official Company parent/child and association documentation; reporting implications for the proposed model.
- Source observations: official documentation explains object setup; this article adds Tom's decision process and association ownership. This is a comparison with selected source coverage, not a comprehensive competitive ranking analysis.
- Statistics are optional and require a primary measurement with date and method. The fictional example and documented design choices supply the evidence; do not add generic percentages to fill a template.
- Separate September 2026 project status from current platform capabilities. Tom verifies any newer project status before publication.

## Internal links and completion criteria

- `/case-studies/customer-lifecycle` — anchor: account-based CRM project.
- `/services/custom-objects` — anchor: custom HubSpot object modelling.
- `/services/consultancy` — optional anchor: reviewing your CRM architecture.
- `/blog/hubspot-lifecycle-stages-setup-guide` — optional context on lifecycle ownership; avoid equating lifecycle stages with the Account model.
- After publication, consider a contextual inbound link from the case. Do not add links to the proposed article now.

Future writing output: MDX matching the existing blog format, accurate author/date metadata, BlogPosting structured data through the existing template, meaningful alt text and verified links. FAQ answers are reader content; do not promise search rich results. Validate factual claims and metadata before publishing. Optional later distribution: one LinkedIn post about the modelling decision, without unverified impact claims.
