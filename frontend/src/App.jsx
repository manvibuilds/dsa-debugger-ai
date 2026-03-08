import { useState } from "react";
import axios from "axios";

export default function App() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("python");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDebug = async () => {
    if (!code || !error) return;
    setLoading(true);
    setResult("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/debug", {
        code,
        error,
        language,
      });
      setResult(response.data.result);
    } catch (err) {
      setResult("Something went wrong. Check if backend is running.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-green-400">
          DSA Debugger AI
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Paste your failing solution — get a senior engineer's explanation
        </p>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Your Code
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your failing solution here..."
              className="w-full h-48 bg-gray-800 border border-gray-700 rounded-lg p-4 text-green-300 font-mono text-sm resize-none focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Error / Failing Test Case
            </label>
            <textarea
              value={error}
              onChange={(e) => setError(e.target.value)}
              placeholder="What error are you getting? Or which test case is failing?"
              className="w-full h-24 bg-gray-800 border border-gray-700 rounded-lg p-4 text-red-300 font-mono text-sm resize-none focus:outline-none focus:border-green-500"
            />
          </div>

          <button
            onClick={handleDebug}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-black font-bold py-3 rounded-lg transition-colors"
          >
            {loading ? "Analyzing..." : "Debug My Code"}
          </button>

          {result && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-green-400 font-bold mb-4">Analysis</h2>
              <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                {result}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
