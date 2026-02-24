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
    <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wide">
        📝 ExamPortal
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        {user?.role === "STUDENT" && (
          <>
            <Link to="/student/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/student/exams" className="hover:underline">
              Exams
            </Link>
            <Link to="/student/results" className="hover:underline">
              My Results
            </Link>
          </>
        )}
        {user?.role === "FACULTY" && (
          <>
            <Link to="/faculty/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/faculty/exams" className="hover:underline">
              My Exams
            </Link>
            <Link to="/faculty/exams/create" className="hover:underline">
              Create Exam
            </Link>
          </>
        )}

        {user && (
          <div className="flex items-center gap-3 ml-4">
            <span className="bg-blue-800 px-3 py-1 rounded-full text-xs">
              {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
