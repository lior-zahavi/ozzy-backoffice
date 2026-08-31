import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import AccessDeniedPage from './pages/AccessDeniedPage';
import BackofficePage from './pages/BackofficePage';
import LoginPage from './pages/LoginPage';
import OrganizationCreatePage from './pages/OrganizationCreatePage';
import OrganizationDetailsPage from './pages/OrganizationDetailsPage';
import OrganizationsPage from './pages/OrganizationsPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/access-denied"
        element={<AccessDeniedPage />}
      />

      {import.meta.env.DEV && (
        <Route
          path="/preview"
          element={<BackofficePage />}
        >
          <Route
            path="organizations"
            element={<OrganizationsPage />}
          />

          <Route
            path="organizations/new"
            element={<OrganizationCreatePage />}
          />
        </Route>
      )}

      <Route element={<ProtectedRoute />}>
        <Route element={<BackofficePage />}>
          <Route
            path="/organizations"
            element={<OrganizationsPage />}
          />

          <Route
            path="/organizations/new"
            element={<OrganizationCreatePage />}
          />

          <Route
            path="/organizations/:organizationId"
            element={<OrganizationDetailsPage />}
          />
        </Route>
      </Route>

      <Route
        path="/"
        element={
          <Navigate
            to="/organizations"
            replace
          />
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/organizations"
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;