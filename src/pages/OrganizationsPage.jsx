import {useEffect,useState,} from 'react';
import {useNavigate,} from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { listOrganizationsRequest } from '../services/organizationsApi';

function OrganizationsPage() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [organizations, setOrganizations] =useState([]);
  const [isLoading, setIsLoading] =useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const controller = new AbortController();

    const loadOrganizations = async () => {
      try {
        setError('');
        setIsLoading(true);

        const result =
          await listOrganizationsRequest(
            token,
            controller.signal,
          );

        setOrganizations(result);
      } catch (requestError) {
        if (requestError.name === 'AbortError') {
          return;
        }

        setError(requestError.message ||"Unable to load organizations.",);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadOrganizations();

    return () => {
      controller.abort();
    };
  }, [token]);

  const openCreatePage = () => {
    navigate('/organizations/new');
  };

  return (
    <section className="organizations-page">
      <header className="page-heading">
        <div>
          <h1 className="page-title">Organizations</h1>

          <p className="page-subtitle">
            Manage organizations and their integrations.
          </p>
        </div>

        <button
          className="primary-button"
          type="button"
          onClick={openCreatePage}
        >
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            add
          </span>

          Create Organization
        </button>
      </header>

      {isLoading && (
        <div className="organizations-empty">
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            progress_activity
          </span>

          <h2>Loading organizations...</h2>
        </div>
      )}

      {!isLoading && error && (
        <div
          className="organizations-empty"
          role="alert"
        >
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            error
          </span>

          <h2>Unable to load organizations</h2>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && organizations.length === 0 && (
          <div className="organizations-empty">
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
            >
              domain
            </span>

            <h2>No organizations yet</h2>

            <p>
              Create an organization to get started.
            </p>
          </div>
        )}

      {!isLoading &&
        !error &&
        organizations.length > 0 && (
          <div className="organizations-table-wrapper">
            <table className="organizations-table">
              <thead>
                <tr>
                  <th className="column-name-en" scope="col">Name (EN)</th>
                  <th className="column-name-he" scope="col">Name (HE)</th>
                  <th className="column-status" scope="col">Status</th>
                  <th className="column-groups" scope="col">Groups</th>

                  <th className="column-actions" scope="col">
                    <span className="visually-hidden">
                      Actions
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {organizations.map(
                  (organization) => (
                    <tr key={organization.id}>
                      <td className="column-name-en">
                        {organization.name?.EN || '—'}
                      </td>

                      <td className="column-name-he" dir="rtl" lang="he">
                        {organization.name?.HE || '—'}
                      </td>

                      <td className="column-status">{organization.status}</td>

                      <td className="column-groups">
                        {organization.group_count}
                      </td>
                      <td className="column-actions table-actions">
                <div className="table-action-buttons">
                   <button
                     className="table-icon-button"
                     type="button"
                      onClick={() =>
                       navigate(
                         `/organizations/${organization.id}`,
                       )
                     }
                      aria-label={`View ${organization.name?.EN}`}
                     title="View organization"
                    >
                     <span
                        className="material-symbols-outlined"
                       aria-hidden="true"
                     >
                       visibility
                     </span>
                   </button>

                    <button
                     className="table-icon-button"
                     type="button"
                     onClick={() =>navigate(`/organizations/${organization.id}/edit`,)}
                     aria-label={`Edit ${organization.name?.EN}`}
                      title="Edit organization"
                   >
                      <span className="material-symbols-outlined"aria-hidden="true">
                       edit
                      </span>
                    </button>
                 </div>
                </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        )}
    </section>
  );
}

export default OrganizationsPage;
