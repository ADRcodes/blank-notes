# Blank Notes — Spec (Browser-only, Local-first)

## One-liner
A blank page where users type anything; an LLM classifies it into structured entries and suggests relevant actions.

## Core user flow (MVP)
1. User types a single entry and presses Save.
2. App sends the text to the local LLM (Ollama) using `fetch("/ollama/api/generate")`.
3. App parses the LLM output as JSON and validates it against the contract below.
4. App stores:
   - raw text
   - classification result
   - timestamps
   in a browser-local SQLite database (sql.js).
5. UI shows entries grouped into sections:
   - Expenses
   - Calendar
   - Tasks
   - Notes

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
  - store the entry as `unknown`
  - ask a clarifying question or show a gentle error
- Keep prompts deterministic and include examples.

## Future (post-MVP)
- Optional sync (e.g. Supabase).
- Optional external actions behind explicit user confirmation and feature flags.
- Google Calendar integration only after the “suggest” flow is rock-solid.
