import { useState } from "react";
import { generateOllamaResponse } from "../api/ollama";

type AiPromptBoxProps = {
  title: string;
  description?: string;
  samplePrompt: string;
  placeholder?: string;
  model?: string;
};

export default function AiPromptBox({
  title,
  description,
  samplePrompt,
  placeholder = "Type your prompt here...",
  model = "qwen3:8b",
}: AiPromptBoxProps) {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runPrompt() {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");
    setOutput("");

    try {
      const response = await generateOllamaResponse({
        model,
        prompt: trimmed,
      });
      setOutput(response);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function applySample() {
    setPrompt(samplePrompt);
  }

  function clearAll() {
    setPrompt("");
    setOutput("");
    setError("");
  }

  return (
    <section className="prompt-card">
      <header className="prompt-card__header">
        <div>
          <p className="prompt-card__eyebrow">Practice Prompt</p>
          <h2>{title}</h2>
          {description ? <p className="prompt-card__desc">{description}</p> : null}
        </div>
        <span className="prompt-card__model">Model: {model}</span>
      </header>

      <div className="prompt-card__sample">
        <p className="prompt-card__sample-label">Sample prompt</p>
        <p className="prompt-card__sample-text">{samplePrompt}</p>
        <button type="button" className="ghost" onClick={applySample}>
          Use this prompt
        </button>
      </div>

      <label className="prompt-card__input">
        <span>Your prompt</span>
        <textarea
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
        />
      </label>

      <div className="prompt-card__actions">
        <button type="button" onClick={runPrompt} disabled={loading || !prompt.trim()}>
          {loading ? "Thinking..." : "Send prompt"}
        </button>
        <button type="button" className="ghost" onClick={clearAll}>
          Clear
        </button>
      </div>

      <div className="prompt-card__output">
        <p className="prompt-card__output-label">Response</p>
        {error ? <p className="prompt-card__error">{error}</p> : null}
        <pre>{output || "The model response will appear here."}</pre>
      </div>
    </section>
  );
}
