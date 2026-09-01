import { useState } from 'react';
import {useNavigate,} from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import OrganizationForm from '../components/OrganizationForm';
import { createOrganizationRequest } from '../services/organizationsApi';

const createEmptyOrganization = () => ({
  id: `org_${crypto.randomUUID()}`,
  status: 'active',
  nameEn: '',
  nameHe: '',
  studentQuota: '',
  schoolId: '',
  schoolRole: '',
  token: '',
  logoUrl: '',
  groups: [],
});

function OrganizationCreatePage() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [values, setValues] = useState(
    createEmptyOrganization,
  );
  const [isSaving, setIsSaving] =useState(false);
  const [error, setError] = useState("");

  const organizationsPath = '/organizations';
  const discardChanges = () => {navigate(organizationsPath);};

  const createOrganization = async (event) => {
    event.preventDefault();

    setError("");
    setIsSaving(true);

    try {
      const locale =document.documentElement.lang
          .toLowerCase()
          .startsWith('he')? 'he': 'en';

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
