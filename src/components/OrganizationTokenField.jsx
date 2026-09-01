import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateOrganizationToken } from '../utils/tokenGenerator';

function OrganizationTokenField({
  schoolId,
  value,
  onValueChange,
  readOnly = false,
}) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const handleGenerate = () => {
    if (readOnly) {
      return;
    }
    onValueChange(generateOrganizationToken(schoolId),);
  };

  const toggleVisibility = () => {
    setIsVisible((currentValue) => !currentValue);
  };

  return (
    <div className="form-field form-field--full">
      <div className="field-label-row">
        <label htmlFor="organization-token">
          {t('backoffice.orgManagement.integrationDetails.orgToken')}
        </label>

        {!readOnly && (
          <button
            className="generate-token-button"
            type="button"
            onClick={handleGenerate}
          >
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
            >
              refresh
            </span>

            {t('backoffice.orgManagement.integrationDetails.generateNew')}
          </button>
        )}
      </div>

      <div className="token-input-wrapper">
        <input
          id="organization-token"
          name="token"
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={(event) =>
            onValueChange(event.target.value)
          }
          readOnly={readOnly}
          required={!readOnly}
        />

        <button
          className="token-visibility-button"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible? 'Hide organization token': 'Show organization token'}
        >
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            {isVisible? 'visibility_off': 'visibility'}
          </span>
        </button>
      </div>
    </div>
  );
}
export default OrganizationTokenField;