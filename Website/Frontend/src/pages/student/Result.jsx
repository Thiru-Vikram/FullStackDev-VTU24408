import { useLocation, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Result() {
  const { state } = useLocation();
  const result = state?.result;

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 mb-4">No result data found.</p>
          <Link to="/student/results" className="text-blue-600 hover:underline">
            View all results →
          </Link>
        </div>
      </div>
    );
  }

  const isPassed = result.status === "PASS";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className={`text-6xl mb-4`}>{isPassed ? "🎉" : "😔"}</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            {result.examTitle}
          </h1>
          <p
            className={`text-xl font-bold mt-2 ${isPassed ? "text-green-600" : "text-red-600"}`}
          >
            {isPassed ? "PASSED" : "FAILED"}
          </p>

          {/* Score Circle */}
          <div
            className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto my-6 border-8 ${isPassed ? "border-green-400" : "border-red-400"}`}
          >
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {result.percentage?.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 border-t pt-6">
            <div>
              <p className="text-2xl font-bold text-gray-800">{result.score}</p>
              <p className="text-gray-400 mt-1">Score</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {result.totalMarks}
              </p>
              <p className="text-gray-400 mt-1">Total Marks</p>
            </div>
            <div>
              <p
                className={`text-2xl font-bold ${isPassed ? "text-green-600" : "text-red-600"}`}
              >
                {result.status}
              </p>
              <p className="text-gray-400 mt-1">Status</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Link
            to="/student/exams"
            className="flex-1 text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Take Another Exam
          </Link>
          <Link
            to="/student/results"
            className="flex-1 text-center bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            View All Results
          </Link>
        </div>
      </div>
    </div>
  );
}
