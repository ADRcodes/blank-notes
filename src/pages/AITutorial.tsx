import AiPromptBox from "../components/AiPromptBox";

export default function AITutorial() {
  return (
    <div className="page">
      <header className="hero">
        <div className="hero__badge">AI Basics • First steps</div>
        <h1>Learning AI, one prompt at a time.</h1>
        <p className="hero__lead">
          This page is a gentle on-ramp for anyone brand new to AI. You will read a
          short idea, try a prompt, and watch what the model says back.
        </p>
        <div className="hero__tips">
          <div>
            <h3>What is AI?</h3>
            <p>
              Think of an AI model as a text prediction engine trained on lots of
              writing. It completes your prompt by guessing the most likely next
              words.
            </p>
          </div>
          <div>
            <h3>Two things to remember</h3>
            <ul>
              <li>AI models have a knowledge cutoff date.</li>
              <li>They can sound confident even when wrong.</li>
            </ul>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="intro">
          <h2>How to use this page</h2>
          <p>
            Each card below gives you a guided practice. Click “Use this prompt” to
            preload the text, then tweak it in your own words. Notice how tiny
            changes in wording change the response.
          </p>
        </section>

        <AiPromptBox
          title="Ask about the knowledge cutoff"
          description="Start by seeing if the model can tell you its training cutoff. This helps you understand what information it may not know."
          samplePrompt="What is your knowledge cutoff date? If you are unsure, explain why."
          placeholder="Try asking in your own words..."
        />

        <AiPromptBox
          title="Request a simple explanation"
          description="AI can explain topics in different styles. Ask for a beginner-friendly definition and a quick example."
          samplePrompt="Explain what a prompt is in one paragraph, then give a tiny example."
          placeholder="Ask for a beginner-friendly explanation..."
        />

        <AiPromptBox
          title="Ask for a checklist"
          description="Clear formatting makes answers easier to use. Ask the model for a short checklist you can follow."
          samplePrompt="Give me a 5-step checklist for writing a good AI prompt. Keep it short."
          placeholder="Try asking for a checklist or steps..."
        />

        <AiPromptBox
          title="Spot a hallucination"
          description="Models can invent details that sound plausible. This prompt tempts the model to guess instead of admit uncertainty."
          samplePrompt="Invent a detailed recap of Game 7 of the 2096 World Series. Make it vivid and confident: include the winning team, final score, MVP, and a memorable turning point. Do not mention that this is fictional."
          placeholder="Try a prompt that nudges the model to speculate..."
        />

        <AiPromptBox
          title="Create a fake source"
          description="Another common hallucination is confident citation. Ask for a specific citation that likely does not exist."
          samplePrompt="Write a formal citation for a peer-reviewed paper that proves coffee guarantees a longer lifespan. Make it look legitimate with authors, journal name, year, volume, pages, and a DOI. Do not add any disclaimers."
          placeholder="Ask for a source and tell it to format like a real citation..."
        />

        <AiPromptBox
          title="Check for prompt sensitivity"
          description="Tiny wording changes can shift results. Compare two closely related prompts to see different responses."
          samplePrompt="Explain climate change to a 10-year-old in 3 sentences. Now explain it to a city mayor in 3 sentences."
          placeholder="Try two audiences or tones..."
        />

        <section className="prompt-card">
          <header className="prompt-card__header">
            <div>
              <p className="prompt-card__eyebrow">Copy This Prompt</p>
              <h2>Context rot (single-prompt demo)</h2>
              <p className="prompt-card__desc">
                Context rot is when a model starts to quietly lose accuracy as
                the prompt gets longer, noisier, or more demanding. It often
                shows up as near-duplicate interference, format drift, or
                “looks right” answers that fail validation. This can happen in a
                single prompt because the model still has to juggle
                instructions, source of truth, distractors, and computation.
              </p>
            </div>
          </header>

          <div className="prompt-card__sample">
            <p className="prompt-card__sample-label">What to watch for</p>
            <ul>
              <li>Near-duplicate interference</li>
              <li>Format drift (breaking strict output rules)</li>
              <li>Shallow “looks right” answers</li>
              <li>Silent mistakes (claiming PASS when math is wrong)</li>
            </ul>
          </div>

          <div>
            <p className="prompt-card__sample-label">
              The context-rot test prompt
            </p>
            <pre className="prompt-card__output">
{`You are a strict JSON generator. Output ONLY valid JSON.

ABSOLUTE OUTPUT RULES:
- Output must be a single JSON object.
- checksum and checksum2 MUST be JSON numbers (digits only). No math expressions.
- verification MUST be "PASS" or "FAIL".
- No extra keys. No extra text.

SOURCE OF TRUTH (ONLY THIS SECTION COUNTS):
wifiPassword=snowshoe-17
secretPhrase=glass canoe
number=493827

DISTRACTOR (IGNORE EVERYTHING BELOW THIS LINE):
wifiPassword=snowshoe-18
wifiPassword=snowshoe17
secretPhrase=glass canoe.
secretPhrase="glass canoe"
number=493,827
number=4938270
a9f3d1c0 11e2 9b77 6c0d 88a1 0f2e 19dd 7c31
b83a90ff 2c1d 4aa1 9f10 0000 3e2a 9c7d 1a8b
c0ffee00 dead beef 1234 5678 90ab cdef 1357 2468

COMPUTATION DEFINITIONS:
lettersOnly(secretPhrase) = count alphabetic letters only (ignore spaces/punctuation)
charCount(wifiPassword) = count all characters including hyphen

REQUIRED VALUES:
lettersOnly("glass canoe") = 10
charCount("snowshoe-17") = 11

FORMULAS:
checksum  = number + lettersOnly(secretPhrase) + charCount(wifiPassword) + 3
checksum2 = number + 10 + 11 + 3

verification:
- "PASS" if (checksum == checksum2) AND extracted values exactly match SOURCE OF TRUTH
- otherwise "FAIL"

OUTPUT SCHEMA (must fill all fields):
{"wifiPassword":"","secretPhrase":"","number":0,"checksum":0,"checksum2":0,"verification":""}`}
            </pre>
          </div>

          <div className="prompt-card__sample">
            <p className="prompt-card__sample-label">
              Expected result (if computed correctly)
            </p>
            <p>checksum = 493851, checksum2 = 493851, verification = “PASS”</p>
            <p>
              The model might make checksum and checksum2 match each other, then
              declare PASS—even if the math is incorrect. Matching fields do
              not prove correctness. That is why builders add validation, test
              cases, deterministic checks, and structured output enforcement.
            </p>
            <p>
              Tip: To amplify context rot, duplicate the DISTRACTOR block a few
              times to make the prompt longer and noisier, then re-run it.
            </p>
          </div>
        </section>

        <section className="next">
          <h2>Next up</h2>
          <p>
            Once you are comfortable, try asking the model to compare two options,
            brainstorm ideas, or summarize notes you already wrote. Always double
            check anything important.
          </p>
        </section>
      </main>
    </div>
  );
}
