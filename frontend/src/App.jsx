import { useState } from "react";
import SyntaxHighlighter from "./SyntaxHighlighter";
import "./App.css";

const FALLBACK_API_BASES = [
  "http://127.0.0.1:8000",
  "http://localhost:8000",
  "https://dsa-debugger-ai-backend.onrender.com",
];

const resolveApiCandidates = () => {
  const fromEnv = import.meta.env.VITE_API_BASE_URL;
  const candidates = fromEnv
    ? [fromEnv.trim(), ...FALLBACK_API_BASES]
    : [...FALLBACK_API_BASES];

  return [...new Set(candidates.filter(Boolean))].map((base) =>
    base.replace(/\/+$/, ""),
  );
};

export default function App() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("python");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeApi, setActiveApi] = useState("");

  const debugEndpoints = resolveApiCandidates();

  const handleDebug = async () => {
    if (!code.trim() || !error.trim()) {
      setApiError("Please provide both code and error/test case.");
      return;
    }

    setLoading(true);
    setResult("");
    setApiError("");

    try {
      const payload = JSON.stringify({
        code,
        error,
        language,
      });

      let data = null;
      let lastError = "";

      for (const baseUrl of debugEndpoints) {
        try {
          const response = await fetch(`${baseUrl}/debug`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: payload,
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          data = await response.json();
          setActiveApi(baseUrl);
          break;
        } catch (endpointError) {
          lastError = endpointError?.message || "Unknown API error";
        }
      }

      if (!data?.result) {
        throw new Error(lastError || "No response from debug service");
      }

      setResult(data.result);
    } catch (err) {
      setApiError(
        "Unable to reach the debugger service. Start backend locally on port 8000 or set VITE_API_BASE_URL in frontend/.env.",
      );
      console.error("Debug request failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-left" aria-hidden="true"></div>
      <div className="ambient ambient-right" aria-hidden="true"></div>

      <div className="app-container">
        <header className="hero">
          <p className="hero-kicker">DSA Debugger AI</p>
          <h1>
            Paste your failing solution, get a senior engineer style breakdown.
          </h1>
          <p className="hero-subtitle">
            Understand exactly what is wrong, why it breaks, and how to fix it
            fast.
          </p>
          {activeApi && <p className="api-chip">Connected to: {activeApi}</p>}
        </header>

        <div className="layout-grid">
          <section className="panel input-panel">
            <div className="field-group">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="code">Your Code</label>
              <textarea
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="int add(int a, int b) {\n  return a + b;\n}"
                className="editor code-input"
              />
            </div>

            <div className="field-group">
              <label htmlFor="error">Error / Failing Test Case</label>
              <textarea
                id="error"
                value={error}
                onChange={(e) => setError(e.target.value)}
                placeholder="failing on input: 2 3, expected 5"
                className="editor error-input"
              />
            </div>

            <button
              onClick={handleDebug}
              disabled={loading || !code.trim() || !error.trim()}
              className="debug-button"
            >
              {loading ? "Analyzing..." : "Debug My Code"}
            </button>

            {apiError && <div className="error-banner">{apiError}</div>}
          </section>

          <section className="panel output-panel">
            {result ? (
              <>
                <div className="output-header">
                  <h2>Analysis</h2>
                  <button onClick={handleCopyResult} className="copy-button">
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <SyntaxHighlighter code={result} language={language} />
              </>
            ) : (
              <div className="empty-state">
                <h3>Ready when you are</h3>
                <p>
                  Add your code and failing case, then run the debugger to get a
                  structured explanation.
                </p>
              </div>
            )}
          </section>
        </div>

        <footer className="footer-note">
          Powered by Gemini and FastAPI. Built for interview prep and contest
          debugging.
        </footer>
      </div>
    </div>
  );
}
