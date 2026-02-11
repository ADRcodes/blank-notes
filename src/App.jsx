import { useState } from "react";
import PromptRunner from "./components/PromptRunner.jsx";

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
    <PromptRunner
      model={model}
      text={text}
      output={output}
      loading={loading}
      onModelChange={setModel}
      onTextChange={setText}
      onRun={run}
    />
  );
}
