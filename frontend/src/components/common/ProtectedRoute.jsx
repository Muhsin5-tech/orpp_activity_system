import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in → redirect to login
  if (!token) return <Navigate to="/login" />;

  // Role not allowed → redirect to "view-calendar" or custom fallback
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={role === "user" ? "/view-calendar" : "/"} />;
  }

  return children;
}

export default ProtectedRoute;
