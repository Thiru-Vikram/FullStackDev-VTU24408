import { useLocation, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Result() {
  const { state } = useLocation();
  const result = state?.result;

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <p className="text-slate-500 mb-4">No result data found.</p>
          <Link
            to="/student/results"
            className="text-indigo-600 font-semibold hover:underline"
          >
            View all results →
          </Link>
        </div>
      </div>
    );
  }

  const isPassed = result.status === "PASS";

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_6px_24px_rgba(99,102,241,0.10)] p-8 text-center">
          <div className={`text-6xl mb-4`}>{isPassed ? "🎉" : "😔"}</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            {result.examTitle}
          </h1>
          <p
            className={`text-xl font-bold mt-2 ${isPassed ? "text-emerald-600" : "text-rose-600"}`}
          >
            {isPassed ? "PASSED" : "FAILED"}
          </p>

          {/* Score Circle */}
          <div
            className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto my-6 border-[10px] ${
              isPassed
                ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                : "border-rose-100 bg-rose-50 text-rose-700"
            }`}
          >
            <div>
              <p className="text-3xl font-bold text-slate-900">
                {result.percentage?.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-sm text-slate-600 border-t pt-6">
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {result.score}
              </p>
              <p className="text-slate-400 mt-1">Score</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {result.totalMarks}
              </p>
              <p className="text-slate-400 mt-1">Total Marks</p>
            </div>
            <div>
              <p
                className={`text-2xl font-bold ${isPassed ? "text-emerald-600" : "text-rose-600"}`}
              >
                {result.status}
              </p>
              <p className="text-slate-400 mt-1">Status</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Link
            to="/student/exams"
            className="flex-1 text-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-3 rounded-xl font-semibold shadow-[0_2px_8px_rgba(79,70,229,0.28)] hover:-translate-y-px transition"
          >
            Take Another Exam
          </Link>
          <Link
            to="/student/results"
            className="flex-1 text-center bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition"
          >
            View All Results
          </Link>
        </div>
      </div>
    </div>
  );
}
