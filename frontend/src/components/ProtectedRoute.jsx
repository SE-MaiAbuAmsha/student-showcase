import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isLoggedIn = Boolean(localStorage.getItem("userName"));

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}
