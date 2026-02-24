import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createExam, getMyExams, updateExam } from "../../api/facultyService";
import Navbar from "../../components/Navbar";

const empty = {
  title: "",
  description: "",
  duration: "",
  totalMarks: "",
  passPercentage: "",
  startTime: "",
  endTime: "",
};

export default function CreateExam() {
  const { examId } = useParams(); // present only when editing
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isEdit = Boolean(examId);

  // Pre-fill form when editing
  useEffect(() => {
    if (!isEdit) return;
    getMyExams().then((res) => {
      const exam = res.data.find((e) => String(e.id) === examId);
      if (exam) {
        setForm({
          title: exam.title || "",
          description: exam.description || "",
          duration: exam.duration || "",
          totalMarks: exam.totalMarks || "",
          passPercentage: exam.passPercentage || "",
          startTime: exam.startTime ? exam.startTime.slice(0, 16) : "",
          endTime: exam.endTime ? exam.endTime.slice(0, 16) : "",
        });
      }
    });
  }, [examId, isEdit]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        ...form,
        duration: parseInt(form.duration),
        totalMarks: parseInt(form.totalMarks),
        passPercentage: parseFloat(form.passPercentage),
        startTime: form.startTime || null,
        endTime: form.endTime || null,
      };
      if (isEdit) {
        await updateExam(examId, payload);
      } else {
        await createExam(payload);
      }
      navigate("/faculty/exams");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save exam.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? "Edit Exam" : "Create New Exam"}
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-6 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exam Title *
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Data Structures Midterm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Brief description of the exam..."
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (mins) *
              </label>
              <input
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                required
                min={1}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Marks *
              </label>
              <input
                type="number"
                name="totalMarks"
                value={form.totalMarks}
                onChange={handleChange}
                required
                min={1}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pass % *
              </label>
              <input
                type="number"
                name="passPercentage"
                value={form.passPercentage}
                onChange={handleChange}
                required
                min={0}
                max={100}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="40"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="datetime-local"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="datetime-local"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : isEdit ? "Update Exam" : "Create Exam"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/faculty/exams")}
              className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
