import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const [status, setStatus] = useState("checking"); // "checking" | "in" | "out"

  useEffect(() => {
    // Ask the server whether the session is still valid.
    fetch("/api/me.php")
      .then((response) => {
        if (response.ok) {
          setStatus("in");
        } else {
          // Session is gone: clear the display hints too.
          localStorage.removeItem("userName");
          localStorage.removeItem("userEmail");
          setStatus("out");
        }
      })
      .catch(() => setStatus("out"));
  }, []);

  if (status === "checking") {
    return <p className="container">Loading...</p>;
  }

  return status === "in" ? <Outlet /> : <Navigate to="/login" replace />;
}
