import { useState } from "react";
import { generateOllamaResponse } from "../api/ollama";
import { splitNotes } from "../features/editor/splitNotes";

type NoteAnalysisResult = {
  note: string;
  response: string;
  error: string | null;
  clarifyingQuestion: string | null;
};

function extractClarifyingQuestion(rawResponse: string): string | null {
  try {
    const parsed = JSON.parse(rawResponse) as unknown;
    if (typeof parsed !== "object" || parsed === null) {
      return null;
    }

    const candidate = parsed as {
      needs_clarification?: unknown;
      clarifying_question?: unknown;
    };

    if (candidate.needs_clarification !== true) {
      return null;
    }

    if (typeof candidate.clarifying_question !== "string") {
      return null;
    }

    const question = candidate.clarifying_question.trim();
    return question.length > 0 ? question : null;
  } catch {
    return null;
  }
}

export default function BlankNote() {
  const [documentText, setDocumentText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<NoteAnalysisResult[]>([]);

  async function analyzeNotes() {
    const notes = splitNotes(documentText);
    if (notes.length === 0) {
      setAnalysisResults([]);
      return;
    }

    setIsAnalyzing(true);
    const orderedResults: NoteAnalysisResult[] = [];

    try {
      for (const note of notes) {
        try {
          const response = await generateOllamaResponse({
            model: "qwen3:8b",
            prompt: note,
          });

          orderedResults.push({
            note,
            response,
            error: null,
            clarifyingQuestion: extractClarifyingQuestion(response),
          });
        } catch (error) {
          orderedResults.push({
            note,
            response: "",
            error: error instanceof Error ? error.message : "Something went wrong.",
            clarifyingQuestion: null,
          });
        }
      }

      setAnalysisResults(orderedResults);
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="blank-note-page">
      <main className="blank-note-shell">
        <section className="blank-note-paper">
          <textarea
            className="blank-note-editor"
            value={documentText}
            onChange={(event) => setDocumentText(event.target.value)}
            placeholder="Type any thought, idea, or note..."
            spellCheck
          />
        </section>

        <div className="blank-note-actions">
          <button
            type="button"
            onClick={analyzeNotes}
            disabled={!documentText.trim() || isAnalyzing}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Notes"}
          </button>
        </div>
        {analysisResults.length > 0 ? (
          <p className="blank-note-status">
            Processed {analysisResults.length}{" "}
            {analysisResults.length === 1 ? "note" : "notes"}.
          </p>
        ) : null}

        {analysisResults.length > 0 ? (
          <section className="blank-note-results" aria-live="polite">
            {analysisResults.map((result, index) => (
              <article className="blank-note-result" key={`${index}-${result.note}`}>
                <p className="blank-note-result__label">Note {index + 1}</p>
                <pre className="blank-note-result__note">{result.note}</pre>
                {result.error ? (
                  <p className="blank-note-result__error">{result.error}</p>
                ) : (
                  <pre className="blank-note-result__response">{result.response}</pre>
                )}
                {result.clarifyingQuestion ? (
                  <p className="blank-note-result__clarify">
                    Clarification needed: {result.clarifyingQuestion}
                  </p>
                ) : null}
              </article>
            ))}
          </section>
        ) : null}
      </main>
    </div>
  );
}
