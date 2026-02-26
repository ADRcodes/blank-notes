# AGENTS.md — Blank Notes (project instructions)

## Always-on defaults (applies to every request)
- Read `GLOBAL_RULES.md` first.
- Use `docs/spec.md`, `docs/plan.md`, and `docs/todo.md` as the source of truth.
- Keep diffs small and focused.
- Implement work as one TODO item at a time unless explicitly told otherwise.
- Never execute external side effects in MVP (calendar writes, email sends, etc.). Suggestions only.

## Modes (use these to keep prompts tiny)
When the user writes one of these keywords, follow that behavior exactly.

### Mode: SYNC
Goal: Re-orient to the project.
Do:
- Read: `GLOBAL_RULES.md`, `docs/spec.md`, `docs/plan.md`, `docs/todo.md`,
  `memory-bank/progress.md`, `memory-bank/decisions.md`
- Return:
  - 5 bullets: current state
  - Next recommended TODO
  - Any blocking questions/risks
No code changes.

### Mode: DOCS
Goal: Update documentation only.
Do:
- Edit ONLY: `docs/spec.md`, `docs/plan.md`, `docs/todo.md`
- Keep updates minimal (avoid bloat)
- Produce atomic TODO items (one checkbox = one deliverable)
No source code changes.

### Mode: DO
Goal: Implement exactly one TODO item.
Do:
- Implement ONLY the next unchecked item in `docs/todo.md`
- If the TODO is ambiguous, ask a question before coding
- Run `npm run typecheck` after changes
- Update `memory-bank/progress.md`
No extra refactors or bonus tasks.

### Mode: NEXT
Goal: Same as DO, but assumes you just completed one TODO.
Do:
- Implement the next unchecked TODO item (still one at a time)
- Run `npm run typecheck`
- Update `memory-bank/progress.md`

### Mode: FIX
Goal: Debug and restore green checks.
Do:
- Focus only on fixing the reported issue (typecheck/build/runtime)
- Make the smallest change that resolves it
- Run `npm run typecheck`
- Update `memory-bank/progress.md`
No new features.

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
- Ask before adding new dependencies (sql.js is approved).
- Keep TS types clean and consistent.

## Commands
- dev: `npm run dev`
- build: `npm run build`
- lint: `npm run lint`
- typecheck: `npm run typecheck`

## Suggested structure (keep consistent)
- `src/features/ingest/`  -> LLM prompt + parsing + validation
- `src/db/`               -> sql.js wrapper, schema, persistence to IndexedDB
- `src/components/`       -> UI components

## Definition of Done (for DO/NEXT/FIX)
- `npm run typecheck` passes
- memory bank updated:
  - always: `memory-bank/progress.md`
  - if decision made: `memory-bank/decisions.md`