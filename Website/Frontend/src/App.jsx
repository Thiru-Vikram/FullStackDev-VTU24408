import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Student
import StudentDashboard from "./pages/student/StudentDashboard";
import AvailableExams from "./pages/student/AvailableExams";
import TakeExam from "./pages/student/TakeExam";
import Result from "./pages/student/Result";
import AttemptHistory from "./pages/student/AttemptHistory";

// Faculty
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import ManageExams from "./pages/faculty/ManageExams";
import CreateExam from "./pages/faculty/CreateExam";
import AddQuestions from "./pages/faculty/AddQuestions";
import ViewResults from "./pages/faculty/ViewResults";

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "FACULTY")
    return <Navigate to="/faculty/dashboard" replace />;
  return <Navigate to="/student/dashboard" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root */}
        <Route path="/" element={<RootRedirect />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/exams"
          element={
            <ProtectedRoute role="STUDENT">
              <AvailableExams />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/exams/:examId"
          element={
            <ProtectedRoute role="STUDENT">
              <TakeExam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/result"
          element={
            <ProtectedRoute role="STUDENT">
              <Result />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/results"
          element={
            <ProtectedRoute role="STUDENT">
              <AttemptHistory />
            </ProtectedRoute>
          }
        />

        {/* Faculty Routes */}
        <Route
          path="/faculty/dashboard"
          element={
            <ProtectedRoute role="FACULTY">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/exams"
          element={
            <ProtectedRoute role="FACULTY">
              <ManageExams />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/exams/create"
          element={
            <ProtectedRoute role="FACULTY">
              <CreateExam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/exams/:examId/edit"
          element={
            <ProtectedRoute role="FACULTY">
              <CreateExam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/exams/:examId/questions"
          element={
            <ProtectedRoute role="FACULTY">
              <AddQuestions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/exams/:examId/results"
          element={
            <ProtectedRoute role="FACULTY">
              <ViewResults />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
