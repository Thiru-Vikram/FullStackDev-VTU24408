import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllExams, getMyResults } from "../../api/studentService";
import Navbar from "../../components/Navbar";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllExams(), getMyResults()])
      .then(([examsRes, resultsRes]) => {
        setExams(examsRes.data || []);
        setResults(resultsRes.data || []);
      })
      .catch(() => setError("Failed to load dashboard data. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const passed = results.filter((r) => r.status === "PASS").length;
  const failed = results.filter((r) => r.status === "FAIL").length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-slate-500 mb-8">Here&apos;s your overview</p>

        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : error ? (
          <p className="text-rose-500">{error}</p>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-500 text-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_4px_16px_rgba(99,102,241,0.08)]">
                <span className="absolute right-2 top-0 text-7xl opacity-10">
                  🧭
                </span>
                <p className="text-3xl font-bold">{exams.length}</p>
                <p className="text-sm mt-1 opacity-80">Available Exams</p>
              </div>
              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-500 text-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_4px_16px_rgba(99,102,241,0.08)]">
                <span className="absolute right-2 top-0 text-7xl opacity-10">
                  ✅
                </span>
                <p className="text-3xl font-bold">{passed}</p>
                <p className="text-sm mt-1 opacity-80">Exams Passed</p>
              </div>
              <div className="relative overflow-hidden bg-gradient-to-br from-rose-600 to-rose-500 text-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_4px_16px_rgba(99,102,241,0.08)]">
                <span className="absolute right-2 top-0 text-7xl opacity-10">
                  ⚠️
                </span>
                <p className="text-3xl font-bold">{failed}</p>
                <p className="text-sm mt-1 opacity-80">Exams Failed</p>
              </div>
            </div>

            {/* Available Exams */}
            <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_4px_16px_rgba(99,102,241,0.08)] p-6 mb-6 transition-all duration-150">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Available Exams
                </h2>
                <Link
                  to="/student/exams"
                  className="text-indigo-600 text-sm hover:underline"
                >
                  View all →
                </Link>
              </div>
              {exams.length === 0 ? (
                <p className="text-slate-400 text-sm">
                  No exams available right now.
                </p>
              ) : (
                <div className="space-y-3">
                  {exams.slice(0, 3).map((exam) => (
                    <div
                      key={exam.id}
                      className="flex items-center justify-between border border-slate-200 rounded-xl px-4 py-3 hover:shadow-[0_8px_32px_rgba(99,102,241,0.15)] hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <div>
                        <p className="font-medium text-slate-900">
                          {exam.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          {exam.duration} mins · {exam.totalMarks} marks
                        </p>
                      </div>
                      <Link
                        to={`/student/exams/${exam.id}`}
                        className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-xs px-3 py-1.5 rounded-xl font-bold shadow-[0_2px_8px_rgba(79,70,229,0.28)] hover:-translate-y-px transition-all"
                      >
                        Start
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Results */}
            <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_4px_16px_rgba(99,102,241,0.08)] p-6 transition-all duration-150">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Recent Results
                </h2>
                <Link
                  to="/student/results"
                  className="text-indigo-600 text-sm hover:underline"
                >
                  View all →
                </Link>
              </div>
              {results.length === 0 ? (
                <p className="text-slate-400 text-sm">No results yet.</p>
              ) : (
                <div className="space-y-3">
                  {results.slice(0, 3).map((r) => (
                    <div
                      key={r.attemptId}
                      className="flex items-center justify-between border border-slate-200 rounded-xl px-4 py-3"
                    >
                      <div>
                        <p className="font-medium text-slate-900">
                          {r.examTitle}
                        </p>
                        <p className="text-xs text-slate-400">
                          Score: {r.score}/{r.totalMarks} ·{" "}
                          {r.percentage?.toFixed(1)}%
                        </p>
                      </div>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${r.status === "PASS" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-600 border border-rose-200"}`}
                      >
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
