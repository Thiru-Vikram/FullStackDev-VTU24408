import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <Link to="/" className="flex items-center gap-2">
        <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm font-bold px-2.5 py-1 rounded-lg shadow-[0_4px_12px_rgba(79,70,229,0.35)]">
          📝
        </span>
        <span className="text-lg font-semibold text-slate-900 tracking-tight">
          ExamPortal
        </span>
      </Link>

      <div className="flex items-center gap-6 text-sm font-semibold text-slate-600">
        {user?.role === "STUDENT" && (
          <>
            <Link
              to="/student/dashboard"
              className="px-3 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/student/exams"
              className="px-3 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              Exams
            </Link>
            <Link
              to="/student/results"
              className="px-3 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              My Results
            </Link>
          </>
        )}
        {user?.role === "FACULTY" && (
          <>
            <Link
              to="/faculty/dashboard"
              className="px-3 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/faculty/exams"
              className="px-3 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              My Exams
            </Link>
            <Link
              to="/faculty/exams/create"
              className="px-3 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              Create Exam
            </Link>
          </>
        )}

        {user && (
          <div className="flex items-center gap-3 ml-4">
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold">
              {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="border border-slate-200 text-slate-500 px-3 py-1 rounded-lg text-xs font-semibold hover:border-rose-300 hover:text-rose-500 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
