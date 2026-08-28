import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ allowWithoutMfa = false }) {
  const { user, isLoading, isEditor, hasMfa } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!isEditor) {
    return <Navigate to="/access-denied" replace />
  }

  if (!hasMfa && !allowWithoutMfa) {
    return <Navigate to="/mfa-enroll" replace />
  }

  if (hasMfa && allowWithoutMfa) {
    return <Navigate to="/organizations" replace />
  }

  return <Outlet />
}

export default ProtectedRoute;