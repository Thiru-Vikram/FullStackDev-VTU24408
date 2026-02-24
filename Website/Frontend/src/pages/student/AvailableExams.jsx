import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllExams } from "../../api/studentService";
import Navbar from "../../components/Navbar";

export default function AvailableExams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllExams()
      .then((res) => setExams(res.data))
      .catch(() => setError("Failed to load exams."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
          Available Exams
        </h1>

        {loading && <p className="text-slate-400">Loading exams...</p>}
        {error && <p className="text-rose-500">{error}</p>}

        {!loading && exams.length === 0 && (
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_4px_16px_rgba(99,102,241,0.08)] p-8 text-center text-slate-400">
            No exams are available at the moment.
          </div>
        )}

        <div className="grid gap-4">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_4px_16px_rgba(99,102,241,0.08)] p-5 flex items-start justify-between hover:shadow-[0_8px_32px_rgba(99,102,241,0.15)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {exam.title}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {exam.description}
                </p>
                <div className="flex flex-wrap gap-3 mt-3 text-xs">
                  <span className="rounded-full px-2.5 py-1 font-semibold border bg-indigo-50 text-indigo-600 border-indigo-100">
                    ⏱ {exam.duration} mins
                  </span>
                  <span className="rounded-full px-2.5 py-1 font-semibold border bg-violet-50 text-violet-600 border-violet-100">
                    📝 {exam.totalMarks} marks
                  </span>
                  <span className="rounded-full px-2.5 py-1 font-semibold border bg-emerald-50 text-emerald-600 border-emerald-100">
                    ✅ Pass: {exam.passPercentage}%
                  </span>
                  <span className="rounded-full px-2.5 py-1 font-semibold border bg-amber-50 text-amber-600 border-amber-100">
                    🧑‍🏫 {exam.facultyName}
                  </span>
                  {exam.questionCount > 0 && (
                    <span className="rounded-full px-2.5 py-1 font-semibold border bg-rose-50 text-rose-500 border-rose-100">
                      ❓ {exam.questionCount} questions
                    </span>
                  )}
                </div>
              </div>
              <Link
                to={`/student/exams/${exam.id}`}
                className="ml-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm px-4 py-2 rounded-xl font-bold shadow-[0_2px_8px_rgba(79,70,229,0.28)] hover:-translate-y-px transition-all whitespace-nowrap"
              >
                Start Exam
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
