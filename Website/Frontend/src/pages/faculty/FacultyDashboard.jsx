import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getMyExams } from "../../api/facultyService";
import Navbar from "../../components/Navbar";

export default function FacultyDashboard() {
  const { user } = useAuth();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyExams()
      .then((res) => setExams(res.data || []))
      .catch(() => setError("Failed to load exams. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">
          Welcome, {user?.name}! 🧑‍🏫
        </h1>
        <p className="text-slate-500 mb-8">Faculty Dashboard</p>

        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : error ? (
          <p className="text-rose-500">{error}</p>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-500 text-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_4px_16px_rgba(99,102,241,0.08)]">
                <span className="absolute right-2 top-0 text-6xl opacity-10">
                  📘
                </span>
                <p className="text-3xl font-bold">{exams.length}</p>
                <p className="text-sm mt-1 opacity-80">Total Exams Created</p>
              </div>
              <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-500 text-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_4px_16px_rgba(99,102,241,0.08)]">
                <span className="absolute right-2 top-0 text-6xl opacity-10">
                  📝
                </span>
                <p className="text-3xl font-bold">
                  {exams.reduce((s, e) => s + (e.questionCount || 0), 0)}
                </p>
                <p className="text-sm mt-1 opacity-80">Total Questions</p>
              </div>
              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-500 text-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_4px_16px_rgba(16,185,129,0.10)]">
                <Link to="/faculty/exams/create" className="block">
                  <span className="absolute right-2 top-0 text-6xl opacity-10">
                    ➕
                  </span>
                  <p className="text-2xl font-bold">+ New</p>
                  <p className="text-sm mt-1 opacity-80">Create Exam</p>
                </Link>
              </div>
            </div>

            {/* Exam list */}
            <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_6px_24px_rgba(99,102,241,0.10)] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  My Exams
                </h2>
                <Link
                  to="/faculty/exams"
                  className="text-indigo-600 text-sm font-semibold hover:underline"
                >
                  Manage all →
                </Link>
              </div>
              {exams.length === 0 ? (
                <p className="text-slate-400 text-sm">
                  No exams yet.{" "}
                  <Link
                    to="/faculty/exams/create"
                    className="text-indigo-600 hover:underline font-semibold"
                  >
                    Create one
                  </Link>
                  .
                </p>
              ) : (
                <div className="space-y-3">
                  {exams.slice(0, 5).map((exam) => (
                    <div
                      key={exam.id}
                      className="flex items-center justify-between border border-slate-200 rounded-xl px-4 py-3 hover:shadow-[0_8px_32px_rgba(99,102,241,0.12)] hover:-translate-y-0.5 transition"
                    >
                      <div>
                        <p className="font-medium text-slate-900">
                          {exam.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          {exam.duration} mins · {exam.totalMarks} marks ·{" "}
                          {exam.questionCount} questions
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/faculty/exams/${exam.id}/questions`}
                          className="text-xs bg-violet-50 text-violet-700 px-3 py-1.5 rounded-lg border border-violet-100 hover:bg-violet-100"
                        >
                          Questions
                        </Link>
                        <Link
                          to={`/faculty/exams/${exam.id}/results`}
                          className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100 hover:bg-emerald-100"
                        >
                          Results
                        </Link>
                      </div>
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
