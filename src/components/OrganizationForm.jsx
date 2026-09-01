import GroupsSection from './GroupsSection';
import MediaAssetsSection from './MediaAssetsSection';
import OrganizationTokenField from './OrganizationTokenField';

function OrganizationForm({
  mode = 'create',
  title,
  values,
  error,
  onChange,
  onDiscard,
  onSubmit,
  isSaving = false,
}) {
  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';

  const updateValue = (name, value) => {
    if (isViewMode || !onChange) {
      return;
    }

    onChange({
      ...values,
      [name]: value,
    });
  };

  const updateField = (event) => {
    const { name, value } = event.target;

    updateValue(name, value);
  };

  const handleSubmit = (event) => {
    if (isViewMode || !onSubmit) {
      event.preventDefault();
      return;
    }

    onSubmit(event);
  };

  return (
    <section className="organization-form-page">
      <header className="page-heading">
        <div>
          <h1 className="page-title">{title}</h1>

          <p className="page-subtitle">
            Manage identity, integration settings, and dynamic
            groups.
          </p>
        </div>

        <div className="form-actions">
          <button
            className="text-button"
            type="button"
            onClick={onDiscard}
            disabled={isSaving}
          >
            {isViewMode? 'Back to Organizations': 'Discard Changes'}
          </button>

          {!isViewMode && (
            <button
              className="primary-button"
              type="submit"
              form="organization-form"
              disabled={isSaving}
            >
              {isSaving? 'Saving...': isEditMode? 'Save Changes': 'Save Organization'}
            </button>
          )}
        </div>
      </header>

      <form
        id="organization-form"
        className="organization-form"
        onSubmit={handleSubmit}
      >
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="organization-form-columns">
          <div className="organization-form-main">
            <section className="form-section">
              <h2>
                <span
                  className="material-symbols-outlined"
                  aria-hidden="true">
                  badge
                </span>
                Core Identity
              </h2>

              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="organization-id">
                    Organization ID
                  </label>

                  <input
                    id="organization-id"
                    type="text"
                    value={values.id || 'Auto-generated'}
                    readOnly/>

                  <small>
                    Generated automatically and cannot be changed.
                  </small>
                </div>

                <div className="form-field">
                  <label htmlFor="status">
                    Status
                  </label>

                  <select
                    id="status"
                    name="status"
                    value={values.status}
                    onChange={updateField}
                    disabled={isViewMode}
                  >
                    <option value="active">
                      Active
                    </option>

                    <option value="inactive">
                      Inactive
                    </option>
                  </select>
                </div>

                <div className="form-divider form-field--full">
                  <span>Display Names</span>
                </div>

                <div className="form-field">
                  <label htmlFor="name-en">
                    Name (EN)
                  </label>

                  <input
                    id="name-en"
                    name="nameEn"
                    type="text"
                    value={values.nameEn}
                    onChange={updateField}
                    readOnly={isViewMode}
                    required={!isViewMode}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="name-he">
                    Name (HE)
                  </label>

                  <input
                    id="name-he"
                    name="nameHe"
                    type="text"
                    value={values.nameHe}
                    onChange={updateField}
                    readOnly={isViewMode}
                    required={!isViewMode}
                    dir="rtl"
                    lang="he"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="student-quota">
                    Student Quota
                  </label>

                  <input
                    id="student-quota"
                    name="studentQuota"
                    type="number"
                    min="0"
                    value={values.studentQuota ?? ''}
                    onChange={updateField}
                    readOnly={isViewMode}
                  />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>
                <span
                  className="material-symbols-outlined"
                  aria-hidden="true">
                  integration_instructions
                </span>

                Integration Details
              </h2>

              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="school-id">
                    IL School ID
                  </label>

                  <input
                    id="school-id"
                    name="schoolId"
                    type="text"
                    value={values.schoolId}
                    onChange={updateField}
                    readOnly={isViewMode}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="school-role">
                    Israeli School Role
                  </label>

                  <input
                    id="school-role"
                    name="schoolRole"
                    type="text"
                    value={values.schoolRole}
                    onChange={updateField}
                    readOnly={isViewMode}
                  />
                </div>

                <OrganizationTokenField
                  schoolId={values.schoolId}
                  value={values.token}
                  onValueChange={(token) =>updateValue('token', token)}
                  readOnly={isViewMode}
                />
              </div>
            </section>
          </div>

          <aside className="organization-form-side">
            <MediaAssetsSection
              logoUrl={values.logoUrl}
              onLogoUrlChange={(logoUrl) =>
                updateValue('logoUrl', logoUrl)
              }
              readOnly={isViewMode}
            />

            <GroupsSection
              groups={values.groups}
              onGroupsChange={(groups) =>
                updateValue('groups', groups)
              }
              readOnly={isViewMode}
            />
          </aside>
        </div>
      </form>
    </section>
  );
}

export default OrganizationForm;
