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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Available Exams
        </h1>

        {loading && <p className="text-gray-400">Loading exams...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && exams.length === 0 && (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
            No exams are available at the moment.
          </div>
        )}

        <div className="grid gap-4">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-xl shadow p-5 flex items-start justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {exam.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{exam.description}</p>
                <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                    ⏱ {exam.duration} mins
                  </span>
                  <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                    📝 {exam.totalMarks} marks
                  </span>
                  <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full">
                    ✅ Pass: {exam.passPercentage}%
                  </span>
                  <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded-full">
                    🧑‍🏫 {exam.facultyName}
                  </span>
                  {exam.questionCount > 0 && (
                    <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full">
                      ❓ {exam.questionCount} questions
                    </span>
                  )}
                </div>
              </div>
              <Link
                to={`/student/exams/${exam.id}`}
                className="ml-4 bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
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
