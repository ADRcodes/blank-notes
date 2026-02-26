const NOTE_SEPARATOR_PATTERN = /(?:\n[ \t]*){3,}/g;

/**
 * Split document text into note chunks using the "two empty lines" rule.
 * Empty or whitespace-only chunks are removed.
 */
export function splitNotes(documentText: string): string[] {
  const normalized = documentText.replace(/\r\n?/g, "\n");

  return normalized
    .split(NOTE_SEPARATOR_PATTERN)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0);
}
