import { Navigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthContext';

function ProtectedRoute() {
  const { t } = useTranslation();
  const { user, isLoading, isEditor } = useAuth();

  if (isLoading) {
    return <p>{t('backoffice.common.loading')}</p>
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
