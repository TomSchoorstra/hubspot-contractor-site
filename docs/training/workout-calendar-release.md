# Workout calendar release

The personal calendar is served at `/l/<existing-personal-key>/kracht-5km` and uses `/api/workout-sessions`. It reuses the existing server-side Supabase configuration and `training_state` table. Each workout has a separate `tom:workout-sessions-v1:<uuid>` row. The existing running-plan document is not modified.

Only application source, validation code and this technical release note are included. Local training exports, browser state, screenshots and unrelated workspace documents are excluded. No logged training measurements or credentials are added to the repository.

Release checks: clean dependency installation from the lockfile, production build, training tests, online browser checks on desktop and mobile, persistence across reload and a second browser context, and read-only comparison with the existing running-plan data. Browser checks create only clearly marked temporary workouts and remove them through the application's normal undoable deletion flow.

Production publication uses the existing GitHub main branch and Vercel integration after validation of a separate preview branch. The previous production revision is retained as a rollback reference in the local verification report.

## Library and templates, 11 November 2026

The page now uses `/api/training`. Exercises, workout templates and workouts are separate rows named `tom:training-v2:<type>:<id>` in the same `training_state` table. Rows written by the earlier calendar (`tom:workout-sessions-v1:<uuid>`) and the running-plan document are not read, changed or removed; the earlier `/api/workout-sessions` route is gone. The seed library, the three templates and the twelve-run sequence live in `src/lib/training-library.ts` and are checked by `npm run validate:programme` before every build.
