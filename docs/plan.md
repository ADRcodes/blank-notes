# Plan (MVP)

## Architecture (high level)
- Ingest pipeline:
  document text -> split into notes -> classify each note -> normalize -> persist -> render inline note results
- No side effects initially:
  calendar/task actions are suggestions until explicitly enabled

## Modules
- src/
  - App.tsx (simple nav shell; `Blank Note` default and `AI tutorial` secondary)
- src/pages/
  - BlankNote.tsx (primary blank document UI + Analyze button + inline results)
  - AITutorial.tsx (secondary tutorial/reference page)
- src/features/ingest/
  - classify.ts (calls local model, returns structured JSON)
  - schemas.ts (TS types for output contract)
  - normalize.ts (coerces partial outputs into safe defaults)
- src/features/editor/
  - splitNotes.ts (splits document using two-empty-lines rule)
- src/features/store/
  - entriesStore.ts (persist + query document + per-note results)
- src/features/ui/
  - NoteResult.tsx (render normalized result and clarification inline)

## Milestones
0. Keep simple nav between `Blank Note` and `AI tutorial`, with `Blank Note` as default.
1. Implement deterministic note splitting with the two-empty-lines rule.
2. Classify each note as an individual prompt and normalize each response.
3. Render per-note results directly below the relevant input note.
4. Show inline clarifying questions when classification is uncertain.
5. Persist and restore document + per-note results via sql.js + IndexedDB.
6. Later: Google Calendar integration behind a feature flag.
