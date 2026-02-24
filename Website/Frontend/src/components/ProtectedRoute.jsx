import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  // If the stored user has an unrecognised role, clear stale data and go to login
  const knownRoles = ["STUDENT", "FACULTY"];
  if (!knownRoles.includes(user.role)) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return (
      <Navigate
        to={
          user.role === "FACULTY" ? "/faculty/dashboard" : "/student/dashboard"
        }
        replace
      />
    );
  }

  return children;
}
