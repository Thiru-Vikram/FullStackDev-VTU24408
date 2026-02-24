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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Welcome, {user?.name}! 🧑‍🏫
        </h1>
        <p className="text-gray-500 mb-8">Faculty Dashboard</p>

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
                <p className="text-sm mt-1 opacity-80">Total Exams Created</p>
              </div>
              <div className="bg-purple-500 text-white rounded-xl p-5 shadow">
                <p className="text-3xl font-bold">
                  {exams.reduce((s, e) => s + (e.questionCount || 0), 0)}
                </p>
                <p className="text-sm mt-1 opacity-80">Total Questions</p>
              </div>
              <div className="bg-green-500 text-white rounded-xl p-5 shadow">
                <Link to="/faculty/exams/create" className="block">
                  <p className="text-2xl font-bold">+ New</p>
                  <p className="text-sm mt-1 opacity-80">Create Exam</p>
                </Link>
              </div>
            </div>

            {/* Exam list */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  My Exams
                </h2>
                <Link
                  to="/faculty/exams"
                  className="text-blue-600 text-sm hover:underline"
                >
                  Manage all →
                </Link>
              </div>
              {exams.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No exams yet.{" "}
                  <Link
                    to="/faculty/exams/create"
                    className="text-blue-600 hover:underline"
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
                      className="flex items-center justify-between border rounded-lg px-4 py-3"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {exam.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {exam.duration} mins · {exam.totalMarks} marks ·{" "}
                          {exam.questionCount} questions
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/faculty/exams/${exam.id}/questions`}
                          className="text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg hover:bg-purple-200"
                        >
                          Questions
                        </Link>
                        <Link
                          to={`/faculty/exams/${exam.id}/results`}
                          className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200"
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
