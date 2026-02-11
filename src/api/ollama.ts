type GenerateOllamaResponseParams = {
  model: string;
  prompt: string;
};

type OllamaGenerateResponse = {
  response?: string;
};

export async function generateOllamaResponse({
  model,
  prompt,
}: GenerateOllamaResponseParams) {
  const res = await fetch("/ollama/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errText}`);
  }

  const data = (await res.json()) as OllamaGenerateResponse;
  return data.response ?? "(No response field returned)";
}
