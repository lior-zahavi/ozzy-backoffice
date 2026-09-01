import { useTranslation } from 'react-i18next';

function GroupCard({
  group,
  index,
  onChange,
  onDelete,
  readOnly = false,
}) {
  const { t } = useTranslation();
  const updateField = (event) => {
    if (readOnly) {
      return;
    }

    const { name, value } = event.target;

    onChange(index, name, value);
  };

  return (
    <article className="group-card">
      <header className="group-card-header">
        <span className="group-id">
          {group.id || t('backoffice.orgManagement.groups.newGroup')}
        </span>

        {!readOnly && (
          <button
            className="icon-button"
            type="button"
            onClick={() => onDelete(index)}
            aria-label={`Delete group ${index + 1}`}
            title="Delete group"
          >
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
            >
              delete
            </span>
          </button>
        )}
      </header>

      <div className="form-field">
        <label htmlFor={`group-expiry-${index}`}>
          {t('backoffice.orgManagement.groups.expiryTimestampMobile')}
        </label>

        <input
          id={`group-expiry-${index}`}
          name="expiry"
          type="date"
          value={group.expiry}
          onChange={updateField}
          readOnly={readOnly}
        />
      </div>

      <div className="form-field">
        <label htmlFor={`group-name-en-${index}`}>
          {t('backoffice.orgManagement.groups.nameEn')}
        </label>

        <input
          id={`group-name-en-${index}`}
          name="nameEn"
          type="text"
          value={group.nameEn}
          onChange={updateField}
          readOnly={readOnly}
          required={!readOnly}
        />
      </div>

      <div className="form-field">
        <label htmlFor={`group-name-he-${index}`}>
          {t('backoffice.orgManagement.groups.nameHe')}
        </label>

        <input
          id={`group-name-he-${index}`}
          name="nameHe"
          type="text"
          value={group.nameHe}
          onChange={updateField}
          readOnly={readOnly}
          required={!readOnly}
          dir="rtl"
          lang="he"
        />
      </div>
    </article>
  );
}

export default GroupCard;