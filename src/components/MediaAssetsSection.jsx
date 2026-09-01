import { useState } from 'react';

function MediaAssetsSection({logoUrl,onLogoUrlChange,readOnly = false,}) 
{
  const [failedLogoUrl, setFailedLogoUrl] =useState('');

  const shouldShowLogo =logoUrl && failedLogoUrl !== logoUrl;

  const handleLogoUrlChange = (event) => {
    if (readOnly) {
      return;
    }

    onLogoUrlChange(event.target.value);
  };

  return (
    <section className="form-section media-assets-section">
      <h2>
        <span
          className="material-symbols-outlined"
          aria-hidden="true"
        >
          image
        </span>

        Media Assets
      </h2>

      <div className="logo-area">
        <div className="logo-preview">
          {shouldShowLogo ? (
            <img
              src={logoUrl}
              alt="Organization logo preview"
              onError={() =>setFailedLogoUrl(logoUrl)}
            />
          ) : (
            <span
              className="material-symbols-outlined"
              aria-hidden="true">
              image
            </span>
          )}
        </div>

        <div className="logo-fetch">
          <button
            className="text-button"
            type="button"
            disabled
            title="This feature is not available yet">
            <span
              className="material-symbols-outlined"
              aria-hidden="true">
              language
            </span>

            Fetch from Website
          </button>

          <small>
            Attempts to generate the logo from the organization
            website.
          </small>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="logo-url">
          Manual URL
        </label>

        <input
          id="logo-url"
          name="logoUrl"
          type="url"
          value={logoUrl}
          placeholder="https://example.com/logo.png"
          onChange={handleLogoUrlChange}
          readOnly={readOnly}
        />

        {failedLogoUrl === logoUrl && logoUrl && (
          <small
            className="field-error"
            role="alert"
          >
            The logo could not be loaded from this URL.
          </small>
        )}
      </div>
    </section>
  );
}

export default MediaAssetsSection;