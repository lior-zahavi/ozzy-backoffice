import {useEffect,useState,} from 'react';
import {useNavigate,useParams,} from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import OrganizationForm from '../components/OrganizationForm';
import {getOrganizationRequest,updateOrganizationRequest,} from '../services/organizationsApi';

function OrganizationDetailsPage({mode = 'view',})
 {
  const navigate = useNavigate();
  const { organizationId } = useParams();
  const { token } = useAuth();

  const [organization, setOrganization] =useState(null);

  const [isLoading, setIsLoading] =useState(true);

  const [isSaving, setIsSaving] =useState(false);

  const [error, setError] = useState('');

  const isEditMode = mode === 'edit';

  useEffect(() => {
    const controller = new AbortController();

    const loadOrganization = async () => {
      try {
        setError('');
        setIsLoading(true);

        const result =await getOrganizationRequest(
            organizationId,
            token,
            controller.signal,
          );

        setOrganization(result);
      } catch (requestError) {
        if (
          requestError.name === 'AbortError'
        ) {
          return;
        }

        setError(requestError.message ||"Unable to load the organization.",);
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
  }, [organizationId, token]);

  const goBack = () => {navigate('/organizations');};

  const saveOrganization = async (event) => {
    event.preventDefault();

    setError('');
    setIsSaving(true);

    try {
      const locale =document.documentElement.lang
          .toLowerCase()
          .startsWith('he')? 'he': 'en';

      await updateOrganizationRequest(organization,token,locale,);

      navigate(`/organizations/${organizationId}`,);
    } catch (requestError) {
      setError(requestError.message ||"Unable to update the organization.",);
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

          <h2>Loading organization...</h2>

          <p>
            Please wait while the organization is
            loaded.
          </p>
        </div>
      </section>
    );
  }

  if (error && !organization) {
    return (
      <section className="organization-form-page">
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

          <h2>
            Unable to load organization
          </h2>

          <p>{error}</p>

          <button
            className="secondary-button"
            type="button"
            onClick={goBack}
          >
            Back to Organizations
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

          <h2>Organization not found</h2>

          <button
            className="secondary-button"
            type="button"
            onClick={goBack}
          >
            Back to Organizations
          </button>
        </div>
      </section>
    );
  }

  return (
      <OrganizationForm
        mode={mode}
        title={isEditMode? 'Edit Organization': 'Organization Details'}
        values={organization}
        error={error}
        onChange={isEditMode? setOrganization: undefined}
        onDiscard={goBack}
        onSubmit={isEditMode? saveOrganization: undefined}
        isSaving={isSaving}
      />
  );
}

export default OrganizationDetailsPage;
