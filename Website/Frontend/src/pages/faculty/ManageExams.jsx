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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manage Exams</h1>
          <Link
            to="/faculty/exams/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            + Create New Exam
          </Link>
        </div>

        {loading && <p className="text-gray-400">Loading...</p>}

        {!loading && exams.length === 0 && (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
            No exams found.{" "}
            <Link
              to="/faculty/exams/create"
              className="text-blue-600 hover:underline"
            >
              Create your first exam
            </Link>
            .
          </div>
        )}

        <div className="space-y-4">
          {exams.map((exam) => (
            <div key={exam.id} className="bg-white rounded-xl shadow p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-semibold text-gray-800">
                    {exam.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {exam.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 text-xs">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                      ⏱ {exam.duration} mins
                    </span>
                    <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                      📝 {exam.totalMarks} marks
                    </span>
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full">
                      ✅ Pass: {exam.passPercentage}%
                    </span>
                    <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full">
                      ❓ {exam.questionCount} questions
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <Link
                    to={`/faculty/exams/${exam.id}/edit`}
                    className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 text-center"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/faculty/exams/${exam.id}/questions`}
                    className="text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg hover:bg-purple-200 text-center"
                  >
                    Questions
                  </Link>
                  <Link
                    to={`/faculty/exams/${exam.id}/results`}
                    className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 text-center"
                  >
                    Results
                  </Link>
                  <button
                    onClick={() => handleDelete(exam.id)}
                    disabled={deletingId === exam.id}
                    className="text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-200 disabled:opacity-50"
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
