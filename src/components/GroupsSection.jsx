import GroupCard from './GroupCard';

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

          Groups
        </h2>

        <span className="groups-count">
          {groups.length}{' '}
          {groups.length === 1? 'Group': 'Groups'}
        </span>
      </header>

      <div className="groups-list">
        {groups.length === 0 ? (
          <p className="groups-empty">
            No groups have been added yet.
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

          Add New Group
        </button>
      )}
    </section>
  );
}

export default GroupsSection;