import GroupCard from './GroupCard';
import { useTranslation } from 'react-i18next';

const createEmptyGroup = () => ({
  id: `grp_${crypto.randomUUID()}`,
  expiry: '',
  nameEn: '',
  nameHe: '',
});

function GroupsSection({
  groups,
  onGroupsChange,
  readOnly = false,
}) {
  const { t } = useTranslation();
  const addGroup = () => {
    if (readOnly) {
      return;
    }

    onGroupsChange([
      ...groups,
      createEmptyGroup(),
    ]);
  };

  const updateGroup = (
    index,
    field,
    value,
  ) => {
    if (readOnly) {
      return;
    }

    const updatedGroups = groups.map(
      (group, groupIndex) =>
        groupIndex === index
          ? {
              ...group,
              [field]: value,
            }
          : group,
    );

    onGroupsChange(updatedGroups);
  };

  const deleteGroup = (index) => {
    if (readOnly) {
      return;
    }

    const updatedGroups = groups.filter((_, groupIndex) => groupIndex !== index,);

    onGroupsChange(updatedGroups);
  };

  return (
    <section className="form-section groups-section">
      <header className="section-heading">
        <h2>
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            group
          </span>

          {t('backoffice.orgManagement.groups.title')}
        </h2>

        <span className="groups-count">
          {t('backoffice.orgManagement.groups.activeCount', { count: groups.length })}
        </span>
      </header>

      <div className="groups-list">
        {groups.length === 0 ? (
          <p className="groups-empty">
            {t('backoffice.orgManagement.groups.noGroups')}
          </p>
        ) : (
          groups.map((group, index) => (
            <GroupCard
              key={group.id}
              group={group}
              index={index}
              onChange={updateGroup}
              onDelete={deleteGroup}
              readOnly={readOnly}
            />
          ))
        )}
      </div>

      {!readOnly && (
        <button
          className="add-group-button"
          type="button"
          onClick={addGroup}
        >
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            add_circle
          </span>

          {t('backoffice.orgManagement.groups.addNewGroup')}
        </button>
      )}
    </section>
  );
}

export default GroupsSection;