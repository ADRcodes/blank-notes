# Blank Notes — Spec (Browser-only, Local-first)

## One-liner
A blank page where users type anything; an LLM classifies it into structured entries and suggests relevant actions.

## MVP UI (clarified)
- App includes two pages in a simple nav:
  - `Blank Note` (default)
  - `AI tutorial`
- `Blank Note` is the primary workflow page and should feel like a blank document.
- On `Blank Note`, keep the interaction minimal:
  - one large typing surface for free-form text input
  - one explicit action button: `Analyze Notes`

## Note boundary rule (MVP)
- Two empty lines separate notes.
- Each derived note is sent as an individual LLM prompt.
- Ignore empty notes from leading/trailing separators.
- Preserve note order for rendering and storage.

## Core user flow (MVP)
1. User opens `Blank Note` (default page).
2. User types free-form text in the blank document.
3. User clicks `Analyze Notes`.
4. App splits the document into notes using the two-empty-lines rule.
5. App sends each note to the local LLM using `fetch("/ollama/api/generate")`.
6. App parses, validates, and normalizes each model response against the contract below.
7. App renders each result directly below its relevant note text.
8. If `needs_clarification` is `true`, app shows `clarifying_question` inline below that note.
9. App stores raw document text, per-note classification results, and timestamps in browser-local SQLite.

## Non-goals (MVP)
- No automatic external actions (no writing to Google Calendar, no sending emails, etc.).
- The app only suggests actions.

## Storage (MVP)
- Use SQLite in the browser via sql.js (WASM).
- Persist the SQLite database to IndexedDB.
- Data must survive page refreshes and browser restarts.

## Classification contract (IMPORTANT)
The LLM must return JSON ONLY, matching:

{
  "type": "expense" | "calendar" | "task" | "note" | "unknown",
  "confidence": number,            // 0..1
  "title": string,                 // short label
  "data": object,                  // type-specific
  "action": {
    "mode": "suggest",             // MVP always "suggest"
    "kind": "add_expense" | "create_calendar_event" | "create_task" | "none",
    "payload": object              // proposed action details
  },
  "needs_clarification": boolean,
  "clarifying_question": string | null
}

### Type-specific `data` fields (MVP)
- expense:
  - amount: number | null
  - currency: string | null
  - merchant: string | null
  - category: string | null
- calendar:
  - start: string | null (ISO 8601 preferred)
  - end: string | null (ISO 8601 preferred)
  - attendees: string[] | null
  - location: string | null
- task:
  - due: string | null (ISO 8601 preferred)
  - priority: "low" | "medium" | "high" | null
- note:
  - tags: string[] | null

## Robustness requirements
- Never trust raw model output.
- If JSON parsing fails or required fields are missing:
  - store the note as `unknown`
  - ask a clarifying question or show a gentle inline error
- Per-note failures must not block other notes from being processed.
- Keep note/result mapping stable by note order.
- Keep prompts deterministic and include examples.

## Future (post-MVP)
- Optional sync (e.g. Supabase).
- Optional external actions behind explicit user confirmation and feature flags.
- Google Calendar integration only after the “suggest” flow is rock-solid.
