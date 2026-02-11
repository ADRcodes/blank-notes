# AGENTS.md — Blank Notes (project instructions)

## Read order (IMPORTANT)
1) Read `GLOBAL_RULES.md`
2) Read `docs/spec.md`, `docs/plan.md`, `docs/todo.md`
3) Read relevant source files
Do not write code until you’ve proposed a short plan.

## Project goal
Blank Notes is a blank page where a user types anything.
The app uses an LLM to classify the entry and propose structured results and suggested actions.

## MVP rules
- Browser-only app (no backend database).
- Local-first storage using SQLite in the browser via `sql.js`.
- Persist the SQLite DB to IndexedDB so data survives refreshes.
- Actions are suggestions only. Do NOT execute external side effects (e.g. Google Calendar writes) in MVP.

## LLM integration
- LLM calls happen via fetch to `/ollama/api/generate`.
- The LLM must output JSON matching the contract in `docs/spec.md`.
- Always validate/normalize LLM output. Never trust raw model output.

## Repo etiquette
- Small diffs. One TODO item at a time.
- Ask before adding new dependencies (sql.js is approved).
- Keep TS types clean and consistent.

## Commands (edit if different)
- dev: `npm run dev`
- build: `npm run build`
- lint: `npm run lint`
- typecheck: `npm run typecheck` (if present)
- test: `npm run test` or `npm run vitest` (if present)

## Suggested structure (create if missing)
- `src/features/ingest/`  -> LLM prompt + parsing + validation
- `src/features/db/`      -> sql.js wrapper, schema, persistence to IndexedDB
- `src/features/entries/` -> entry model, queries, grouping by type
- `src/components/`       -> UI components

## Memory bank updates
After completing a TODO item:
- Append a short update to `memory-bank/progress.md`
If a decision was made:
- Add a bullet to `memory-bank/decisions.md`
