import { useState } from 'react';
import {useLocation,useNavigate,} from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import OrganizationForm from '../components/OrganizationForm';
import { createOrganizationRequest } from '../services/organizationsApi';

const createEmptyOrganization = () => ({
  id: `org_${crypto.randomUUID()}`,
  status: 'active',
  nameEn: '',
  nameHe: '',
  schoolId: '',
  schoolRole: '',
  token: '',
  logoUrl: '',
  groups: [],
});

function OrganizationCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();

  const [values, setValues] = useState(
    createEmptyOrganization,
  );
  const [isSaving, setIsSaving] =useState(false);
  const [error, setError] = useState("");

  const isPreview =location.pathname.startsWith('/preview/');

  const organizationsPath = isPreview? '/preview/organizations': '/organizations';

  const discardChanges = () => {navigate(organizationsPath);};

  const createOrganization = async (event) => {
    event.preventDefault();

    if (isPreview) {
      setError("Saving is disabled in preview mode.",);
      return;
    }

    setError("");
    setIsSaving(true);

    try {
      const locale =document.documentElement.lang
          .toLowerCase()
          .startsWith('he')
          ? 'he': 'en';

      await createOrganizationRequest(values,token,locale,);

      navigate(organizationsPath);
    } catch (requestError) {
      setError(requestError.message ||"Unable to create the organization.",);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <OrganizationForm
      mode="create"
      title="Create Organization"
      values={values}
      error={error}
      onChange={setValues}
      onDiscard={discardChanges}
      onSubmit={createOrganization}
      isSaving={isSaving}
    />
  );
}

export default OrganizationCreatePage;
