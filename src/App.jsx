import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import AccessDeniedPage from './pages/AccessDeniedPage';
import BackofficePage from './pages/BackofficePage';
import LoginPage from './pages/LoginPage';
import MfaEnrollmentPage from './pages/MfaEnrollmentPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/access-denied" element={<AccessDeniedPage />} />

      {import.meta.env.DEV && (
  <>
    <Route
      path="/preview/shell"
      element={<BackofficePage />}
    />

    <Route
      path="/preview/mfa"
      element={<MfaEnrollmentPage />}
    />
  </>
)}
      <Route element={<ProtectedRoute allowWithoutMfa />}>
        <Route path="/mfa-enroll" element={<MfaEnrollmentPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/organizations" element={<BackofficePage />} />
      </Route>

      <Route path="/" element={<Navigate to="/organizations" replace />} />
      <Route path="*" element={<Navigate to="/organizations" replace />} />
    </Routes>
  )
}

export default App