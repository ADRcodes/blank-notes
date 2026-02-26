export type ClassificationType =
  | "expense"
  | "calendar"
  | "task"
  | "note"
  | "unknown";

export type ActionMode = "suggest";

export type ActionKind =
  | "add_expense"
  | "create_calendar_event"
  | "create_task"
  | "none";

export type ExpenseData = {
  amount: number | null;
  currency: string | null;
  merchant: string | null;
  category: string | null;
};

export type CalendarData = {
  start: string | null;
  end: string | null;
  attendees: string[] | null;
  location: string | null;
};

export type TaskPriority = "low" | "medium" | "high";

export type TaskData = {
  due: string | null;
  priority: TaskPriority | null;
};

export type NoteData = {
  tags: string[] | null;
};

export type UnknownData = Record<string, unknown>;

export type ClassificationData =
  | ExpenseData
  | CalendarData
  | TaskData
  | NoteData
  | UnknownData;

export type ClassificationAction = {
  mode: ActionMode;
  kind: ActionKind;
  payload: Record<string, unknown>;
};

export type ClassificationResult = {
  type: ClassificationType;
  confidence: number;
  title: string;
  data: ClassificationData;
  action: ClassificationAction;
  needs_clarification: boolean;
  clarifying_question: string | null;
};
