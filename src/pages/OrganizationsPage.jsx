import {useEffect,useState,} from 'react';
import {useNavigate,} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../auth/AuthContext';
import { listOrganizationsRequest } from '../services/organizationsApi';

function OrganizationsPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { t } = useTranslation();

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

        setError(
          requestError.message ||
            t('backoffice.orgManagement.listErrorMessage'),
        );
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
  }, [token, t]);

  const openCreatePage = () => {
    navigate('/organizations/new');
  };

  return (
    <section className="organizations-page">
      <header className="page-heading">
        <div>
          <h1 className="page-title">{t('backoffice.orgManagement.pageTitle')}</h1>

          <p className="page-subtitle">
            {t('backoffice.orgManagement.pageSubtitle')}
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

          {t('backoffice.orgManagement.createTitle')}
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

          <h2>{t('backoffice.orgManagement.loadingOrgsTitle')}</h2>
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

          <h2>{t('backoffice.orgManagement.errorLoadTitle')}</h2>
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

            <h2>{t('backoffice.orgManagement.emptyTitle')}</h2>

            <p>
              {t('backoffice.orgManagement.emptySubtitle')}
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
                  <th className="column-name-en" scope="col">{t('backoffice.orgManagement.coreIdentity.nameEn')}</th>
                  <th className="column-name-he" scope="col">{t('backoffice.orgManagement.coreIdentity.nameHe')}</th>
                  <th className="column-status" scope="col">{t('backoffice.orgManagement.coreIdentity.status')}</th>
                  <th className="column-groups" scope="col">{t('backoffice.orgManagement.groups.title')}</th>

                  <th className="column-actions" scope="col">
                    <span className="visually-hidden">
                      {t('backoffice.orgManagement.actions')}
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

                      <td className="column-status">
                        {organization.status === 'Active' ? t('backoffice.orgManagement.statusActive') : organization.status === 'Inactive' ? t('backoffice.orgManagement.statusInactive') : t('backoffice.orgManagement.statusUnknown')}
                      </td>

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
        aria-label={t('backoffice.orgManagement.viewOrgLabel', {
          name: organization.name?.EN || organization.name?.HE,
        })}
        title={t('backoffice.orgManagement.viewOrg')}
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
        onClick={() =>
          navigate(`/organizations/${organization.id}/edit`)
        }
        aria-label={t('backoffice.orgManagement.editOrgLabel', {
          name: organization.name?.EN || organization.name?.HE,
        })}
        title={t('backoffice.orgManagement.editOrg')}
      >
      <span
        className="material-symbols-outlined"
        aria-hidden="true"
      >
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
