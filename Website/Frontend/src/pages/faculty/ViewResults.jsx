import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExamResults } from "../../api/facultyService";
import Navbar from "../../components/Navbar";

export default function ViewResults() {
  const { examId } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getExamResults(examId)
      .then((res) => setResults(res.data))
      .catch(() => setError("Failed to load results."))
      .finally(() => setLoading(false));
  }, [examId]);

  const passed = results.filter((r) => r.status === "PASS").length;
  const avg =
    results.length > 0
      ? (
          results.reduce((s, r) => s + r.percentage, 0) / results.length
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
          Student Results
        </h1>

        {loading && <p className="text-slate-400">Loading...</p>}
        {error && <p className="text-rose-500">{error}</p>}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-500 text-white rounded-xl p-4 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_4px_16px_rgba(99,102,241,0.08)]">
              <p className="text-3xl font-bold">{results.length}</p>
              <p className="text-sm opacity-80 mt-1">Total Attempts</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-500 text-white rounded-xl p-4 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_4px_16px_rgba(16,185,129,0.10)]">
              <p className="text-3xl font-bold">{passed}</p>
              <p className="text-sm opacity-80 mt-1">Passed</p>
            </div>
            <div className="bg-gradient-to-br from-violet-600 to-indigo-500 text-white rounded-xl p-4 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_4px_16px_rgba(99,102,241,0.08)]">
              <p className="text-3xl font-bold">{avg}%</p>
              <p className="text-sm opacity-80 mt-1">Avg. Score</p>
            </div>
          </div>
        )}

        {!loading && results.length === 0 && !error && (
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_6px_24px_rgba(99,102,241,0.10)] p-8 text-center text-slate-400">
            No students have attempted this exam yet.
          </div>
        )}

        {results.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_6px_24px_rgba(99,102,241,0.10)] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-5 py-3 text-slate-600 font-semibold">
                    #
                  </th>
                  <th className="text-left px-5 py-3 text-slate-600 font-semibold">
                    Student
                  </th>
                  <th className="text-left px-5 py-3 text-slate-600 font-semibold">
                    Score
                  </th>
                  <th className="text-left px-5 py-3 text-slate-600 font-semibold">
                    Percentage
                  </th>
                  <th className="text-left px-5 py-3 text-slate-600 font-semibold">
                    Status
                  </th>
                  <th className="text-left px-5 py-3 text-slate-600 font-semibold">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.map((r, i) => (
                  <tr key={r.attemptId} className="hover:bg-slate-50">
                    <td className="px-5 py-3 text-slate-400">{i + 1}</td>
                    <td className="px-5 py-3 font-medium text-slate-900">
                      {r.studentName}
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {r.score}/{r.totalMarks}
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {r.percentage?.toFixed(1)}%
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          r.status === "PASS"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-rose-50 text-rose-700 border border-rose-100"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-400">
                      {new Date(r.submittedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
