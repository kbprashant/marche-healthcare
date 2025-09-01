import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth({ children }) {
  const { isAuthed, booting } = useAuth();
  const location = useLocation();

  if (booting) return null; // or a spinner component

  return isAuthed
    ? children
    : <Navigate to="/admin/login" state={{ from: location }} replace />;
}
