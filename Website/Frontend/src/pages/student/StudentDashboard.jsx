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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-500 mb-8">Here&apos;s your overview</p>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-600 text-white rounded-xl p-5 shadow">
                <p className="text-3xl font-bold">{exams.length}</p>
                <p className="text-sm mt-1 opacity-80">Available Exams</p>
              </div>
              <div className="bg-green-500 text-white rounded-xl p-5 shadow">
                <p className="text-3xl font-bold">{passed}</p>
                <p className="text-sm mt-1 opacity-80">Exams Passed</p>
              </div>
              <div className="bg-red-500 text-white rounded-xl p-5 shadow">
                <p className="text-3xl font-bold">{failed}</p>
                <p className="text-sm mt-1 opacity-80">Exams Failed</p>
              </div>
            </div>

            {/* Available Exams */}
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Available Exams
                </h2>
                <Link
                  to="/student/exams"
                  className="text-blue-600 text-sm hover:underline"
                >
                  View all →
                </Link>
              </div>
              {exams.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No exams available right now.
                </p>
              ) : (
                <div className="space-y-3">
                  {exams.slice(0, 3).map((exam) => (
                    <div
                      key={exam.id}
                      className="flex items-center justify-between border rounded-lg px-4 py-3"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {exam.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {exam.duration} mins · {exam.totalMarks} marks
                        </p>
                      </div>
                      <Link
                        to={`/student/exams/${exam.id}`}
                        className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
                      >
                        Start
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Results */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Recent Results
                </h2>
                <Link
                  to="/student/results"
                  className="text-blue-600 text-sm hover:underline"
                >
                  View all →
                </Link>
              </div>
              {results.length === 0 ? (
                <p className="text-gray-400 text-sm">No results yet.</p>
              ) : (
                <div className="space-y-3">
                  {results.slice(0, 3).map((r) => (
                    <div
                      key={r.attemptId}
                      className="flex items-center justify-between border rounded-lg px-4 py-3"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {r.examTitle}
                        </p>
                        <p className="text-xs text-gray-400">
                          Score: {r.score}/{r.totalMarks} ·{" "}
                          {r.percentage?.toFixed(1)}%
                        </p>
                      </div>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${r.status === "PASS" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
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
