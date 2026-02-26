# TODO (execute top-to-bottom)

## P0 — Single-page blank-document workflow
- [x] Keep simple nav with `Blank Note` and `AI tutorial`, with `Blank Note` as default
- [x] Upgrade `BlankNote` input into a document-style editor surface for free-form typing
- [x] Add note-splitting utility that separates notes on two empty lines and filters empty notes
- [x] Add analyze flow that runs one LLM prompt per derived note while preserving note order
- [x] Render one result block directly below each note
- [x] Show inline clarifying question below a note when `needs_clarification` is `true`

## P1 — Persistence (spec-aligned)
- [ ] Add browser-local SQLite setup via `sql.js` for document text + per-note results
- [ ] Persist and restore the SQLite database via IndexedDB
- [ ] Rehydrate latest document text and per-note results on page load

## P2 — Correctness + resilience
- [x] Add TypeScript types for ClassificationResult
- [x] Add runtime validation + safe normalization for LLM output
- [ ] Wire parse/normalize into the analyze flow before rendering or saving
- [ ] Add deterministic prompt template + examples for contract compliance
- [ ] Add per-note error fallback (`unknown` + gentle inline message) without blocking other note results

## P3 — External actions (later)
- [ ] Google Calendar: OAuth + event creation, behind a feature flag
