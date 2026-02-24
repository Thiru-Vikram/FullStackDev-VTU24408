import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyExams, deleteExam } from "../../api/facultyService";
import Navbar from "../../components/Navbar";

export default function ManageExams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchExams = () => {
    getMyExams()
      .then((res) => setExams(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this exam? This will also delete all questions and results.",
      )
    )
      return;
    setDeletingId(id);
    try {
      await deleteExam(id);
      setExams((prev) => prev.filter((e) => e.id !== id));
    } catch {
      alert("Failed to delete exam.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Manage Exams
          </h1>
          <Link
            to="/faculty/exams/create"
            className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-4 py-2 rounded-xl shadow-[0_2px_8px_rgba(79,70,229,0.28)] hover:-translate-y-px transition text-sm font-semibold"
          >
            + Create New Exam
          </Link>
        </div>

        {loading && <p className="text-slate-400">Loading...</p>}

        {!loading && exams.length === 0 && (
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_6px_24px_rgba(99,102,241,0.10)] p-8 text-center text-slate-400">
            No exams found.{" "}
            <Link
              to="/faculty/exams/create"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Create your first exam
            </Link>
            .
          </div>
        )}

        <div className="space-y-4">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_6px_24px_rgba(99,102,241,0.10)] p-5 hover:shadow-[0_8px_32px_rgba(99,102,241,0.12)] hover:-translate-y-0.5 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    {exam.title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {exam.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 text-xs font-semibold">
                    <span className="rounded-full px-2.5 py-1 border bg-indigo-50 text-indigo-600 border-indigo-100">
                      ⏱ {exam.duration} mins
                    </span>
                    <span className="rounded-full px-2.5 py-1 border bg-violet-50 text-violet-600 border-violet-100">
                      📝 {exam.totalMarks} marks
                    </span>
                    <span className="rounded-full px-2.5 py-1 border bg-emerald-50 text-emerald-600 border-emerald-100">
                      ✅ Pass: {exam.passPercentage}%
                    </span>
                    <span className="rounded-full px-2.5 py-1 border bg-amber-50 text-amber-600 border-amber-100">
                      ❓ {exam.questionCount} questions
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4 min-w-[120px]">
                  <Link
                    to={`/faculty/exams/${exam.id}/edit`}
                    className="text-xs text-center bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/faculty/exams/${exam.id}/questions`}
                    className="text-xs text-center bg-violet-50 text-violet-700 px-3 py-1.5 rounded-lg border border-violet-100 hover:bg-violet-100"
                  >
                    Questions
                  </Link>
                  <Link
                    to={`/faculty/exams/${exam.id}/results`}
                    className="text-xs text-center bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100 hover:bg-emerald-100"
                  >
                    Results
                  </Link>
                  <button
                    onClick={() => handleDelete(exam.id)}
                    disabled={deletingId === exam.id}
                    className="text-xs bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg border border-rose-100 hover:bg-rose-100 disabled:opacity-60"
                  >
                    {deletingId === exam.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
