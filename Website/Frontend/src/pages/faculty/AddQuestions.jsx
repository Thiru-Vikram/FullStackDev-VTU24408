import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addQuestion,
  getQuestions,
  deleteQuestion,
} from "../../api/facultyService";
import Navbar from "../../components/Navbar";

const emptyQ = {
  questionText: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctAnswer: "A",
  marks: 1,
};

export default function AddQuestions() {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState(emptyQ);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchQuestions = () => {
    getQuestions(examId).then((res) => setQuestions(res.data));
  };

  useEffect(() => {
    fetchQuestions();
  }, [examId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await addQuestion(examId, { ...form, marks: parseInt(form.marks) });
      setForm(emptyQ);
      setSuccess("Question added successfully!");
      fetchQuestions();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add question.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    try {
      await deleteQuestion(id);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch {
      alert("Failed to delete question.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Manage Questions
        </h1>

        {/* Add Question Form */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Add New Question
          </h2>

          {error && (
            <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 mb-3 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-600 border border-green-200 rounded-lg px-4 py-3 mb-3 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question Text *
              </label>
              <textarea
                name="questionText"
                value={form.questionText}
                onChange={handleChange}
                required
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter the question..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {["A", "B", "C", "D"].map((opt) => (
                <div key={opt}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Option {opt} *
                  </label>
                  <input
                    type="text"
                    name={`option${opt}`}
                    value={form[`option${opt}`]}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={`Option ${opt}`}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correct Answer *
                </label>
                <select
                  name="correctAnswer"
                  value={form.correctAnswer}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {["A", "B", "C", "D"].map((o) => (
                    <option key={o} value={o}>
                      Option {o}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marks *
                </label>
                <input
                  type="number"
                  name="marks"
                  value={form.marks}
                  onChange={handleChange}
                  required
                  min={1}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Question"}
            </button>
          </form>
        </div>

        {/* Questions List */}
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Questions ({questions.length})
        </h2>
        {questions.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400">
            No questions added yet.
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((q, i) => (
              <div key={q.id} className="bg-white rounded-xl shadow p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      <span className="text-blue-600 font-bold mr-2">
                        Q{i + 1}.
                      </span>
                      {q.questionText}
                      <span className="text-xs text-gray-400 ml-2">
                        ({q.marks} mark{q.marks > 1 ? "s" : ""})
                      </span>
                    </p>
                    <div className="grid grid-cols-2 gap-1 mt-2 text-sm text-gray-600">
                      {["A", "B", "C", "D"].map((opt) => (
                        <span
                          key={opt}
                          className={`px-2 py-1 rounded ${q.correctAnswer === opt ? "bg-green-100 text-green-700 font-semibold" : ""}`}
                        >
                          {opt}. {q[`option${opt}`]}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-green-600 font-medium mt-2">
                      ✅ Correct: Option {q.correctAnswer}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="ml-4 text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
