import { useEffect, useState } from "react";
import { getMyResults } from "../../api/studentService";
import Navbar from "../../components/Navbar";

export default function AttemptHistory() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyResults()
      .then((res) => setResults(res.data))
      .catch(() => setError("Failed to load results."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
          My Attempt History
        </h1>

        {loading && <p className="text-slate-400">Loading results...</p>}
        {error && <p className="text-rose-500">{error}</p>}

        {!loading && results.length === 0 && (
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_6px_24px_rgba(99,102,241,0.10)] p-8 text-center text-slate-400">
            You haven&apos;t attempted any exams yet.
          </div>
        )}

        <div className="space-y-4">
          {results.map((r) => (
            <div
              key={r.attemptId}
              className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_6px_24px_rgba(99,102,241,0.10)] border border-slate-100 p-5 flex items-center justify-between gap-4"
            >
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  {r.examTitle}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Score:{" "}
                  <span className="font-medium text-slate-900">
                    {r.score}/{r.totalMarks}
                  </span>
                  &nbsp;·&nbsp;
                  <span className="font-medium text-indigo-600">
                    {r.percentage?.toFixed(1)}%
                  </span>
                  &nbsp;·&nbsp;
                  <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-[13px] font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Submitted {new Date(r.submittedAt).toLocaleString()}
                  </span>
                </p>
              </div>
              <span
                className={`text-sm font-bold px-4 py-1.5 rounded-full ${
                  r.status === "PASS"
                    ? "bg-emerald-100/80 text-emerald-700 ring-1 ring-emerald-200"
                    : "bg-rose-100/80 text-rose-700 ring-1 ring-rose-200"
                }`}
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
