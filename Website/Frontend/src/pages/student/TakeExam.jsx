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
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <p className="p-8 text-slate-400">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-rose-50 text-rose-700 border border-rose-200 rounded-xl px-4 py-3 mb-4 shadow-sm">
            {error}
          </div>
        )}

        {/* Exam Info / Start Screen */}
        {!started ? (
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_6px_24px_rgba(99,102,241,0.10)] p-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {exam?.title}
            </h1>
            <p className="text-slate-500 mb-6">{exam?.description}</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-700 mb-8">
              <span className="rounded-full px-3 py-1.5 font-semibold border bg-indigo-50 text-indigo-600 border-indigo-100">
                ⏱ {exam?.duration} minutes
              </span>
              <span className="rounded-full px-3 py-1.5 font-semibold border bg-violet-50 text-violet-600 border-violet-100">
                📝 {exam?.totalMarks} marks
              </span>
              <span className="rounded-full px-3 py-1.5 font-semibold border bg-emerald-50 text-emerald-600 border-emerald-100">
                ✅ Pass: {exam?.passPercentage}%
              </span>
              <span className="rounded-full px-3 py-1.5 font-semibold border bg-amber-50 text-amber-600 border-amber-100">
                ❓ {questions.length} questions
              </span>
            </div>
            <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm mb-6">
              ⚠️ Once started, the timer cannot be paused. Make sure you&apos;re
              ready.
            </p>
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-[0_2px_8px_rgba(79,70,229,0.28)] hover:-translate-y-px transition"
            >
              Start Exam
            </button>
          </div>
        ) : (
          <>
            {/* Timer Bar */}
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_6px_24px_rgba(99,102,241,0.10)] px-5 py-3 mb-6 sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/90">
              <h1 className="font-semibold text-slate-900">{exam?.title}</h1>
              <div
                className={`font-mono text-lg font-bold px-4 py-1 rounded-lg ${
                  timeLeft < 60
                    ? "bg-rose-50 text-rose-600 ring-1 ring-rose-200"
                    : "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100"
                }`}
              >
                ⏱ {formatTime(timeLeft)}
              </div>
              <span className="text-sm text-slate-500">
                {Object.keys(answers).length}/{questions.length} answered
              </span>
            </div>

            {/* Questions */}
            <div className="space-y-5 mb-8">
              {questions.map((q, i) => (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_6px_24px_rgba(99,102,241,0.10)] p-5"
                >
                  <p className="font-medium text-slate-900 mb-3">
                    <span className="text-indigo-600 font-bold mr-2">
                      Q{i + 1}.
                    </span>
                    {q.questionText}
                    <span className="text-xs text-slate-400 ml-2">
                      ({q.marks} mark{q.marks > 1 ? "s" : ""})
                    </span>
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {["A", "B", "C", "D"].map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center cursor-pointer border rounded-xl px-4 py-2 transition ${
                          answers[q.id] === opt
                            ? "border-indigo-500 bg-indigo-50 shadow-sm"
                            : "border-slate-200 hover:border-indigo-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          checked={answers[q.id] === opt}
                          onChange={() => handleSelect(q.id, opt)}
                          className="mr-3"
                        />
                        <span className="font-semibold text-indigo-600 mr-2">
                          {opt}.
                        </span>
                        <span className="text-slate-800">
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
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3 rounded-xl font-semibold text-lg shadow-[0_2px_8px_rgba(16,185,129,0.28)] hover:-translate-y-px transition disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Exam"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
