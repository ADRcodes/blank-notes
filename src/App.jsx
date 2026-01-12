import { useState } from "react";
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [model, setModel] = useState("qwen3:8b");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  async function run() {
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/ollama/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          prompt: text,
          stream: false,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      const data = await res.json();
      setOutput(data.response ?? "(No response field returned)");
    } catch (e) {
      setOutput(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <h1>Local LLM (Ollama) Test</h1>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <label>
          Model:&nbsp;
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{ width: 200 }}
          />
        </label>

        <button onClick={run} disabled={loading || !text.trim()}>
          {loading ? "Running..." : "Send"}
        </button>
      </div>

      <textarea
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Try: "I spent $10 on coffee" or "meeting with Evan at 1:00"'
        style={{ width: "100%", marginTop: 12 }}
      />

      <h2>Output</h2>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          background: "#111",
          color: "#eee",
          padding: 12,
          borderRadius: 8,
          minHeight: 120,
        }}
      >
        {output}
      </pre>
    </div>
  );
}