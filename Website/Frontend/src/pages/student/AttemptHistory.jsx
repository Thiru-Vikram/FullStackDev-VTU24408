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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          My Attempt History
        </h1>

        {loading && <p className="text-gray-400">Loading results...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && results.length === 0 && (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
            You haven&apos;t attempted any exams yet.
          </div>
        )}

        <div className="space-y-4">
          {results.map((r) => (
            <div
              key={r.attemptId}
              className="bg-white rounded-xl shadow p-5 flex items-center justify-between"
            >
              <div>
                <h2 className="text-base font-semibold text-gray-800">
                  {r.examTitle}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Score:{" "}
                  <span className="font-medium text-gray-700">
                    {r.score}/{r.totalMarks}
                  </span>
                  &nbsp;·&nbsp; {r.percentage?.toFixed(1)}% &nbsp;·&nbsp;
                  Submitted: {new Date(r.submittedAt).toLocaleString()}
                </p>
              </div>
              <span
                className={`text-sm font-bold px-4 py-1.5 rounded-full ${
                  r.status === "PASS"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
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
