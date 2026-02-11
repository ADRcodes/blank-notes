# Plan (MVP)

## Architecture (high level)
- Ingest pipeline:
  UI entry -> classify(text) -> normalize -> persist -> render section cards
- No side effects initially:
  calendar/task actions are suggestions until explicitly enabled

## Modules
- src/features/ingest/
  - classify.ts (calls local model, returns structured JSON)
  - schemas.ts (zod or TS types for output contract)
  - normalize.ts (coerces partial outputs into safe defaults)
- src/features/store/
  - entriesStore.ts (persist + query)
- src/features/ui/
  - EntryComposer.tsx
  - SectionsView.tsx

## Milestones
0. Migrate the UI + API client to TypeScript for safer iteration.
1. Define classification contract + validation.
2. Local persistence for entries.
3. UI sections and rendering.
4. Improve prompts + add clarifying question flow.
5. Later: Google Calendar integration behind a feature flag.
