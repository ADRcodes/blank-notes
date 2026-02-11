# TODO (execute top-to-bottom)

## P0 — Agent-friendly foundation
- [x] Migrate UI and API client to TypeScript (add TS config, convert .jsx/.js to .tsx/.ts)
- [x] Confirm paths for: LLM client file + main UI entry page, then update AGENTS.md "Structure hints"
- [ ] Add TypeScript types for ClassificationResult
- [ ] Add runtime validation + safe normalization for LLM output
- [ ] Add simple persistence (LocalStorage) for saved entries
- [ ] Render four sections and list entries by type

## P1 — Better UX + correctness
- [ ] Add “needs clarification” follow-up question UI
- [ ] Add edit/reclassify flow
- [ ] Add prompt improvements + examples for classification

## P2 — External actions (later)
- [ ] Google Calendar: OAuth + event creation, behind a feature flag
