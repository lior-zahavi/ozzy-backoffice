import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute() {
  const { user, isLoading, isEditor } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!isEditor) {
    return <Navigate to="/access-denied" replace />
  }

  return <Outlet />
}

export default ProtectedRoute;