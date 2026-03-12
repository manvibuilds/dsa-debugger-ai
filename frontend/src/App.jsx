import { useState } from "react";
import SyntaxHighlighter from "./SyntaxHighlighter";

export default function App() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("python");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleDebug = async () => {
    if (!code.trim() || !error.trim()) {
      setApiError("Please provide both code and error/test case.");
      return;
    }
    
    setLoading(true);
    setResult("");
    setApiError("");
    
    try {
      const response = await fetch("https://dsa-debugger-ai-backend.onrender.com/debug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          error,
          language,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setApiError(
        err.message.includes("fetch")
          ? "Failed to connect to the API. Please check your internet connection."
          : `API Error: ${err.message}`
      );
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
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            AI DSA Debugger
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Paste your failing solution and get expert-level debugging insights powered by AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            {/* Language Selection */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Programming Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors duration-200"
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>

            {/* Code Input */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Your Code
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your failing solution here..."
                className="w-full h-48 bg-gray-800 border border-gray-700 rounded-lg p-4 text-green-300 font-mono text-sm resize-none focus:outline-none focus:border-green-400 transition-colors duration-200"
              />
            </div>

            {/* Error Input */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Error / Failing Test Case
              </label>
              <textarea
                value={error}
                onChange={(e) => setError(e.target.value)}
                placeholder="What error are you getting? Or which test case is failing?"
                className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-4 text-red-300 font-mono text-sm resize-none focus:outline-none focus:border-green-400 transition-colors duration-200"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleDebug}
              disabled={loading || !code.trim() || !error.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyzing your code...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Debug My Code</span>
                </>
              )}
            </button>

            {/* Error Message */}
            {apiError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-400 text-sm font-medium">{apiError}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {result ? (
              <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-green-400 flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>AI Analysis</span>
                  </h2>
                  <button
                    onClick={handleCopyResult}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 text-sm"
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-6">
                  <SyntaxHighlighter code={result} language={language} />
                </div>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-12 text-center">
                <div className="text-gray-500 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-400 mb-2">Ready to debug your code!</h3>
                <p className="text-sm text-gray-500">
                  Fill in your code and error details, then click "Debug My Code" to get AI-powered insights.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>Powered by AI • Built for developers, by developers</p>
        </div>
      </div>
    </div>
  );
}
