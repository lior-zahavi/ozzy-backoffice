import "./header.css";

const headerActions = [
  {
    label: "Notifications",
    icon: "notifications",
  },
  {
    label: "Help",
    icon: "help",
  },
]

function Header() {
  return (
    <header className="header">
      <span className="header-title">Organization Management</span>

      <div className="header-actions">
        <div className="environment-toggle" aria-label="Current environment">
          <span className="environment-option">WWW</span>

          <span className="environment-option environment-option--active">
            EDUIL
          </span>
        </div>

        {headerActions.map((action) => (
          <button
            key={action.label}
            className="header-icon-button"
            type="button"
            aria-label={action.label}>

            <span
              className="material-symbols-outlined"
              aria-hidden="true">
              {action.icon}
            </span>
          </button>
        ))}

        <button
          className="header-avatar"
          type="button"
          aria-label="User account">
          L
        </button>
      </div>
    </header>
  )
}

export default Header;