import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getExam,
  getExamQuestions,
  startExam,
  submitExam,
} from "../../api/studentService";
import Navbar from "../../components/Navbar";

export default function TakeExam() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    Promise.all([getExam(examId), getExamQuestions(examId)])
      .then(([examRes, qRes]) => {
        setExam(examRes.data);
        setQuestions(qRes.data);
        setTimeLeft(examRes.data.duration * 60);
      })
      .catch(() => setError("Failed to load exam."))
      .finally(() => setLoading(false));
  }, [examId]);

  const handleStart = async () => {
    try {
      await startExam(examId);
      setStarted(true);
      // Start countdown
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmit(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Could not start exam.");
    }
  };

  const handleSelect = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async (autoSubmit = false) => {
    if (
      !autoSubmit &&
      !window.confirm("Are you sure you want to submit the exam?")
    )
      return;
    clearInterval(timerRef.current);
    setSubmitting(true);
    try {
      const res = await submitExam(examId, { answers });
      navigate("/student/result", { state: { result: res.data } });
    } catch (err) {
      setError(err.response?.data?.error || "Submission failed.");
      setSubmitting(false);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <p className="p-8 text-gray-400">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        {/* Exam Info / Start Screen */}
        {!started ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {exam?.title}
            </h1>
            <p className="text-gray-500 mb-6">{exam?.description}</p>
            <div className="flex justify-center gap-6 text-sm text-gray-600 mb-8">
              <span>⏱ {exam?.duration} minutes</span>
              <span>📝 {exam?.totalMarks} marks</span>
              <span>✅ Pass: {exam?.passPercentage}%</span>
              <span>❓ {questions.length} questions</span>
            </div>
            <p className="text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-sm mb-6">
              ⚠️ Once started, the timer cannot be paused. Make sure you&apos;re
              ready.
            </p>
            <button
              onClick={handleStart}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
            >
              Start Exam
            </button>
          </div>
        ) : (
          <>
            {/* Timer Bar */}
            <div className="flex items-center justify-between bg-white rounded-xl shadow px-5 py-3 mb-6 sticky top-0 z-10">
              <h1 className="font-bold text-gray-700">{exam?.title}</h1>
              <div
                className={`font-mono text-lg font-bold px-4 py-1 rounded-lg ${timeLeft < 60 ? "bg-red-100 text-red-600" : "bg-blue-50 text-blue-700"}`}
              >
                ⏱ {formatTime(timeLeft)}
              </div>
              <span className="text-sm text-gray-400">
                {Object.keys(answers).length}/{questions.length} answered
              </span>
            </div>

            {/* Questions */}
            <div className="space-y-5 mb-8">
              {questions.map((q, i) => (
                <div key={q.id} className="bg-white rounded-xl shadow p-5">
                  <p className="font-medium text-gray-800 mb-3">
                    <span className="text-blue-600 font-bold mr-2">
                      Q{i + 1}.
                    </span>
                    {q.questionText}
                    <span className="text-xs text-gray-400 ml-2">
                      ({q.marks} mark{q.marks > 1 ? "s" : ""})
                    </span>
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {["A", "B", "C", "D"].map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center cursor-pointer border rounded-lg px-4 py-2 transition ${
                          answers[q.id] === opt
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          checked={answers[q.id] === opt}
                          onChange={() => handleSelect(q.id, opt)}
                          className="mr-3"
                        />
                        <span className="font-semibold text-blue-600 mr-2">
                          {opt}.
                        </span>
                        <span className="text-gray-700">
                          {q[`option${opt}`]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleSubmit(false)}
              disabled={submitting}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Exam"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
