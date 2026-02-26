import { useState } from "react";
import "./App.css";
import AITutorial from "./pages/AITutorial";
import BlankNote from "./pages/BlankNote";

type Page = "blank-note" | "ai-tutorial";

export default function App() {
  const [page, setPage] = useState<Page>("blank-note");

  return (
    <>
      <nav className="app-nav" aria-label="Main pages">
        <button
          type="button"
          className={page === "blank-note" ? "active" : ""}
          onClick={() => setPage("blank-note")}
        >
          Blank Note
        </button>
        <button
          type="button"
          className={page === "ai-tutorial" ? "active" : ""}
          onClick={() => setPage("ai-tutorial")}
        >
          AI tutorial
        </button>
      </nav>

      {page === "blank-note" ? <BlankNote /> : <AITutorial />}
    </>
  );
}
