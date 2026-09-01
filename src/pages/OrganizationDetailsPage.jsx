import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import OrganizationForm from '../components/OrganizationForm';
import {
  getOrganizationRequest,
  updateOrganizationRequest,
} from '../services/organizationsApi';

function OrganizationDetailsPage({ mode = 'view' }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { organizationId } = useParams();
  const { token } = useAuth();

  const [organization, setOrganization] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const isEditMode = mode === 'edit';

  useEffect(() => {
    const controller = new AbortController();

    const loadOrganization = async () => {
      try {
        setError('');
        setIsLoading(true);

        const result = await getOrganizationRequest(
          organizationId,
          token,
          controller.signal,
        );

        setOrganization(result);
      } catch (requestError) {
        if (requestError.name === 'AbortError') {
          return;
        }

        setError(
          requestError.message ||
            t('backoffice.orgManagement.loadErrorMessage'),
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadOrganization();

    return () => {
      controller.abort();
    };
  }, [organizationId, token, t]);

  const goBack = () => {
    navigate('/organizations');
  };

  const saveOrganization = async (event) => {
    event.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      await updateOrganizationRequest(
        organization,
        token,
        i18n.resolvedLanguage === 'he' ? 'he' : 'en',
      );

      navigate(`/organizations/${organizationId}`);
    } catch (requestError) {
      setError(
        requestError.message ||
          t('backoffice.orgManagement.updateErrorMessage'),
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <section className="organization-form-page">
        <div className="organizations-empty">
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            progress_activity
          </span>

          <h2>{t('backoffice.orgManagement.loadingTitle')}</h2>
          <p>{t('backoffice.orgManagement.loadingSubtitle')}</p>
        </div>
      </section>
    );
  }

  if (error && !organization) {
    return (
      <section className="organization-form-page">
        <div className="organizations-empty" role="alert">
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            error
          </span>

          <h2>{t('backoffice.orgManagement.errorLoadOrgTitle')}</h2>
          <p>{error}</p>

          <button
            className="secondary-button"
            type="button"
            onClick={goBack}
          >
            {t('backoffice.orgManagement.backToOrgs')}
          </button>
        </div>
      </section>
    );
  }

  if (!organization) {
    return (
      <section className="organization-form-page">
        <div className="organizations-empty">
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            search_off
          </span>

          <h2>{t('backoffice.orgManagement.notFoundTitle')}</h2>

          <button
            className="secondary-button"
            type="button"
            onClick={goBack}
          >
            {t('backoffice.orgManagement.backToOrgs')}
          </button>
        </div>
      </section>
    );
  }

  return (
    <OrganizationForm
      mode={mode}
      title={t(
        isEditMode
          ? 'backoffice.orgManagement.editTitle'
          : 'backoffice.orgManagement.detailsTitle',
      )}
      values={organization}
      error={error}
      onChange={isEditMode ? setOrganization : undefined}
      onDiscard={goBack}
      onSubmit={isEditMode ? saveOrganization : undefined}
      isSaving={isSaving}
    />
  );
}

export default OrganizationDetailsPage;
