import {
    useEffect,
    useState,
  } from 'react';
  import {
    useNavigate,
    useParams,
  } from 'react-router-dom';
  import { useAuth } from '../auth/AuthContext';
  import OrganizationForm from '../components/OrganizationForm';
  import { getOrganizationRequest } from '../services/organizationsApi';
  
  function OrganizationDetailsPage() {
    const navigate = useNavigate();
    const { organizationId } = useParams();
    const { token } = useAuth();
  
    const [organization, setOrganization] =
      useState(null);
  
    const [isLoading, setIsLoading] =
      useState(true);
  
    const [error, setError] = useState('');
  
    useEffect(() => {
      const controller = new AbortController();
  
      const loadOrganization = async () => {
        try {
          setError('');
          setIsLoading(true);
  
          const result =
            await getOrganizationRequest(
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
              'Unable to load the organization.',
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
    }, [organizationId, token]);
  
    const goBack = () => {
      navigate('/organizations');
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
              Please wait while the organization is loaded.
            </p>
          </div>
        </section>
      );
    }
  
    if (error) {
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
  
            <h2>Unable to load organization</h2>
  
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
        mode="view"
        title="Organization Details"
        values={organization}
        error=""
        onDiscard={goBack}
      />
    );
  }
  
  export default OrganizationDetailsPage;