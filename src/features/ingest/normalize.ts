import type {
  CalendarData,
  ClassificationAction,
  ClassificationResult,
  ClassificationType,
  ExpenseData,
  NoteData,
  TaskData,
  TaskPriority,
} from "./schemas";

const VALID_TYPES: ClassificationType[] = [
  "expense",
  "calendar",
  "task",
  "note",
  "unknown",
];

const VALID_ACTION_KINDS = [
  "add_expense",
  "create_calendar_event",
  "create_task",
  "none",
] as const;

const VALID_PRIORITIES: TaskPriority[] = ["low", "medium", "high"];

const FALLBACK_RESULT: ClassificationResult = {
  type: "unknown",
  confidence: 0,
  title: "Needs clarification",
  data: {},
  action: {
    mode: "suggest",
    kind: "none",
    payload: {},
  },
  needs_clarification: true,
  clarifying_question: "Could you share a bit more detail about this note?",
};

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asBoolean(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function asStringArray(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  if (!value.every((item) => typeof item === "string")) return null;
  return value;
}

function clampConfidence(value: unknown): number {
  const numeric = asNumber(value);
  if (numeric === null) return 0;
  if (numeric < 0) return 0;
  if (numeric > 1) return 1;
  return numeric;
}

function normalizeAction(value: unknown): ClassificationAction {
  if (!isObject(value)) {
    return FALLBACK_RESULT.action;
  }

  const kind = VALID_ACTION_KINDS.includes(value.kind as (typeof VALID_ACTION_KINDS)[number])
    ? (value.kind as (typeof VALID_ACTION_KINDS)[number])
    : "none";

  return {
    mode: "suggest",
    kind,
    payload: isObject(value.payload) ? value.payload : {},
  };
}

function normalizeExpenseData(value: unknown): ExpenseData {
  if (!isObject(value)) {
    return { amount: null, currency: null, merchant: null, category: null };
  }

  return {
    amount: asNumber(value.amount),
    currency: asString(value.currency),
    merchant: asString(value.merchant),
    category: asString(value.category),
  };
}

function normalizeCalendarData(value: unknown): CalendarData {
  if (!isObject(value)) {
    return { start: null, end: null, attendees: null, location: null };
  }

  return {
    start: asString(value.start),
    end: asString(value.end),
    attendees: asStringArray(value.attendees),
    location: asString(value.location),
  };
}

function normalizeTaskData(value: unknown): TaskData {
  if (!isObject(value)) {
    return { due: null, priority: null };
  }

  const rawPriority = asString(value.priority);
  const priority =
    rawPriority && VALID_PRIORITIES.includes(rawPriority as TaskPriority)
      ? (rawPriority as TaskPriority)
      : null;

  return {
    due: asString(value.due),
    priority,
  };
}

function normalizeNoteData(value: unknown): NoteData {
  if (!isObject(value)) {
    return { tags: null };
  }

  return {
    tags: asStringArray(value.tags),
  };
}

function normalizeData(type: ClassificationType, value: unknown): ClassificationResult["data"] {
  switch (type) {
    case "expense":
      return normalizeExpenseData(value);
    case "calendar":
      return normalizeCalendarData(value);
    case "task":
      return normalizeTaskData(value);
    case "note":
      return normalizeNoteData(value);
    default:
      return isObject(value) ? value : {};
  }
}

export function normalizeClassificationResult(input: unknown): ClassificationResult {
  if (!isObject(input)) {
    return FALLBACK_RESULT;
  }

  const type = VALID_TYPES.includes(input.type as ClassificationType)
    ? (input.type as ClassificationType)
    : "unknown";

  const needsClarification = asBoolean(input.needs_clarification);
  const clarifyingQuestion = asString(input.clarifying_question);

  return {
    type,
    confidence: clampConfidence(input.confidence),
    title: asString(input.title) ?? FALLBACK_RESULT.title,
    data: normalizeData(type, input.data),
    action: normalizeAction(input.action),
    needs_clarification: needsClarification ?? type === "unknown",
    clarifying_question:
      clarifyingQuestion ?? (needsClarification ?? type === "unknown"
        ? FALLBACK_RESULT.clarifying_question
        : null),
  };
}

export function parseAndNormalizeClassificationResult(rawResponse: string): ClassificationResult {
  try {
    const parsed = JSON.parse(rawResponse) as unknown;
    return normalizeClassificationResult(parsed);
  } catch {
    return FALLBACK_RESULT;
  }
}
