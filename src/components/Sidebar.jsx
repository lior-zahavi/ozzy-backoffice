import "./sidebar.css";
const navItems = [
    { label: "Dashboard", icon:"dashboard", isStub: true },
    { label: "Organizations", icon:"domain", isActive: true },
    { label: "Content", icon:"article", isStub: true },
    { label: "Settings", icon:"settings", isStub: true },
  ]
  
  function Sidebar() {
    return (
      <aside className="sidebar">
        <div className="sidebar-brand">
        <span className="sidebar-brand-name">Ozzystory</span>
        <span className="sidebar-brand-subtitle">
          Editorial Backoffice
        </span>
      </div>
  
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item.label} type="button"
                className={`nav-item ${item.isActive ? 'nav-item--active' : ''}`}
                aria-current={item.isActive ? 'page' : undefined}>

            <span className="material-symbols-outlined nav-item-icon"
              aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
            {item.isStub && (
              <span className="visually-hidden">Coming soon</span>
            )}
               
            </button>
          ))}
        </nav>
      </aside>
    )
  }
  
  export default Sidebar;