# Blank Notes - Project Plan

This document outlines the end-to-end steps to deliver the complete notes app: capture notes, categorize them with AI, and present them in a useful, searchable view.

## 1) Product Definition
- Experience: app opens to a blank screen with a single freeform input.
- Input model: user types continuously; notes are separated by two returns (blank line).
- Processing: user clicks a button to have AI ingest all notes written so far.
- Initial categories: to-do list, thoughts, ideas, setting up meetings, budgeting, subscriptions.
- Extensibility: allow adding more categories over time.
- Integrations: meeting notes should optionally create calendar events (e.g., Google Calendar).
- Decide MVP scope and non-goals.

## 2) Data Model
- Note: id, raw_text, created_at, updated_at, source, status.
- AI metadata: category, tags, summary, entities, confidence, suggested_actions, timestamps.
- Derived fields: sort_key, due_date, recurrence, archived.
- Storage: local first or server-backed (SQLite/Postgres).

## 3) AI Pipeline Design
- Prompt schema: input fields and required JSON response.
- Validation rules for AI output.
- Confidence thresholds and fallback behavior.
- Model selection strategy and versioning.

## 4) Ingestion Flow
- UI is a blank screen with a single full-page input and an “Ingest notes” button.
- Notes are split on any amount of blank space between entries.
- Submit action triggers AI processing for newly added entries only.
- Cap the number of inputs per batch to avoid model overload; queue remaining entries for the next ingest.
- Optimistic UI for immediate note display.
- Handle errors and retries.

## 5) AI Categorization Service
- API route to accept note text.
- Call model (local or hosted) with prompt template.
- Validate and normalize returned JSON.
- Persist note + metadata to storage.

## 6) Storage Layer
- Choose storage engine and schema (prefer local NoSQL DB over SQLite).
- CRUD endpoints for notes and metadata.
- Migration strategy for schema changes.
- Backups and export (JSON/CSV).

## 7) UI/UX Layout
- Primary layout: blank input area with a single “Ingest notes” action.
- Views: Inbox, Categories, Calendar/Timeline, Tasks, Search.
- Sorting and filtering controls.
- Note detail view with metadata and history.

## 8) Sorting & Grouping Logic
- Default sorting rules per view.
- Grouping by category/tags/date.
- Uncertain or low-confidence bucket.
- Manual overrides to correct AI metadata.

## 9) Search & Query
- Full-text search over raw_text and summary.
- Facets for tags, category, date.
- Quick filters and saved searches.

## 10) Editing & Feedback Loop
- Allow users to edit category/tags.
- Track corrections and feed into prompt tuning.
- Provide "reprocess" and "undo".

## 11) Settings & Config
- Model configuration (local Ollama or hosted).
- Toggle AI features on/off.
- Custom categories and tag sets.
- Integrations: calendar provider(s) and OAuth settings (defer beyond MVP).
- Privacy settings and data retention.

## 12) Performance & Reliability
- Debounce inputs and batch processing.
- Caching for repeated categories.
- Retry queue for failed AI calls.
- Loading states and progress feedback.

## 13) Testing Plan
- Unit tests for parsing/validation.
- Integration tests for AI pipeline.
- UI tests for sorting/filtering behavior.
- Mocked AI responses for stable tests.

## 14) Analytics & Telemetry (Optional)
- Track success/failure of AI categorization.
- User correction rates per category.
- Performance metrics (latency, throughput).

## 15) Deployment
- Vite build and hosting plan.
- Environment variables for model endpoints.
- CI for tests and lint.

## 16) Documentation
- Setup instructions.
- API and schema docs.
- UX guides and screenshots.
- Roadmap and known limitations.

## 17) Milestones
- MVP: note input, AI category, list view.
- v1: search, filters, manual edits.
- v2: timeline view, tasks, exports.
- v3: personalization and model tuning.

## Addenda: Decisions Captured
- **Batching**: ingest only newly added notes; previously ingested notes live on a separate screen with category display and edit/reprocess controls.
- **Batch size**: enforce a max inputs per run; queue remaining un-ingested notes.
- **Splitting**: any amount of blank space separates notes.
- **Categories**: allow multiple categories per note.
- **Tasks**: include due date and completion status.
- **Integrations**: defer beyond calendar basics; no additional integrations yet.
- **Storage**: prefer a local NoSQL DB; evaluate options.
- **Models**: start local, design for future hosted model support.
- **AI errors**: resolved via edits/reprocess on the ingested-notes screen.
