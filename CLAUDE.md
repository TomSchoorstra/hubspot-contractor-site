# CLAUDE.md

Guidance for Claude sessions working in this repo.

## Project

Next.js marketing site for Tom Schoorstra's HubSpot contractor business
(blog, services, case studies, contact form, SEO/GTM tracking), deployed on
Vercel from the `main` branch. Public repo.

It also hosts a small private sub-app: a running-schedule tracker
("loopschema") for the half marathon on 1 nov 2026. See
`LOOPSCHEMA_README.md` for full details. Key files:

- `src/app/l/[slug]/loopschema-html.ts` — the app's frontend, including the
  hardcoded seed data `SEED_TOM` and `SEED_DENISE` (baseline runs per person,
  keyed by training-plan slot, e.g. `"w2r2"`).
- `src/app/api/loopschema/route.ts` — serverless proxy to Supabase
  (`training_state` table), keeps the service-role key server-side.
- `src/lib/loopschema.ts` — maps secret URL slugs to `tom` / `denise`.

Seed entries merge with whatever is in Supabase per slot-key; Supabase wins
if the same key exists there. A seed entry behaves identically to a
DB-logged run for display purposes.

## Workflow: logging a run from a screenshot

When Tom shares a screenshot of a run (from Strava/Garmin/Apple Health/etc.)
in a Claude chat/app session:

1. **If it's not obvious from the screenshot whose run it is** (no
   device/account name shown, ambiguous context), **ask explicitly**
   whether it's for Tom or for Denise before doing anything else.
2. Extract the run data (distance, time, pace, HR, date) from the
   screenshot.
3. Add it as a new entry to `SEED_TOM` or `SEED_DENISE` in
   `src/app/l/[slug]/loopschema-html.ts`, using the correct training-plan
   slot key and matching the existing field/note style.
4. Commit and push to the current working branch.
5. **Always ask before merging/pushing to `main`** — that's what triggers
   the live Vercel production deploy, so it needs explicit confirmation
   each time.

Note: this repo is public, so run data (including HR and coach notes)
committed this way is visible in the Git history. This is an accepted
tradeoff already in place for the existing seed data.
