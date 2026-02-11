export default function PromptRunner({
  model,
  text,
  output,
  loading,
  onModelChange,
  onTextChange,
  onRun,
}) {
  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#4b4036]">
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        <div className="rounded-2xl border border-[#e7d7c5] bg-[#fff7ee] p-6 shadow-2xl shadow-[#d8c2aa]/40">
          <div className="flex flex-col gap-6">
            <header className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-[#b39b85]">
                Local Runner
              </p>
              <h1 className="text-3xl font-semibold text-[#4b4036]">
                Local LLM (Ollama) Test
              </h1>
              <p className="text-sm text-[#8f7a66]">
                Quick prompt sandbox for running local models and capturing the
                response.
              </p>
            </header>

            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <label className="flex flex-col gap-2 text-sm text-[#7e6b5a]">
                Model
                <input
                  value={model}
                  onChange={(e) => onModelChange(e.target.value)}
                  className="h-10 w-full rounded-lg border border-[#e6d5c2] bg-[#fbf2e7] px-3 text-[#4b4036] placeholder:text-[#b39b85] focus:border-[#d9bfa6] focus:outline-none focus:ring-2 focus:ring-[#d9bfa6]/50 md:w-72"
                  placeholder="qwen3:8b"
                />
              </label>

              <button
                onClick={onRun}
                disabled={loading || !text.trim()}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-[#f6c9c4] px-6 text-sm font-semibold text-[#4b4036] transition hover:bg-[#f3bcb5] disabled:cursor-not-allowed disabled:bg-[#d9c7b7] disabled:text-[#8f7a66]"
              >
                {loading ? "Running..." : "Send"}
              </button>
            </div>

            <label className="flex flex-col gap-2 text-sm text-[#7e6b5a]">
              Prompt
              <textarea
                rows={8}
                value={text}
                onChange={(e) => onTextChange(e.target.value)}
                placeholder='Try: "I spent $10 on coffee" or "meeting with Evan at 1:00"'
                className="w-full resize-none rounded-xl border border-[#e6d5c2] bg-[#fbf2e7] px-4 py-3 text-sm text-[#4b4036] placeholder:text-[#b39b85] focus:border-[#d9bfa6] focus:outline-none focus:ring-2 focus:ring-[#d9bfa6]/50"
              />
            </label>

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b39b85]">
                  Output
                </h2>
                <span className="text-xs text-[#9a856f]">
                  {output ? "Latest response" : "Waiting for a run"}
                </span>
              </div>
              <pre className="min-h-[140px] whitespace-pre-wrap rounded-xl border border-[#e6d5c2] bg-[#fbf2e7] p-4 text-sm text-[#4b4036]">
                {output || "No output yet."}
              </pre>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
