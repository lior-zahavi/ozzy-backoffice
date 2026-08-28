import "./sidebar.css";
const navItems = [
    { label: 'Dashboard', isStub: true },
    { label: 'Organizations', isActive: true },
    { label: 'Content', isStub: true },
    { label: 'Settings', isStub: true },
  ]
  
  function Sidebar() {
    return (
      <aside className="sidebar">
        <div className="sidebar-logo">Ozzy</div>
  
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item.label} type="button"
                className={`nav-item ${item.isActive ? 'nav-item--active' : ''}`}>
                {item.label}
                {item.isStub&&(
                    <span className="visually-hidden">Coming soon</span>
                )}
            </button>
          ))}
        </nav>
      </aside>
    )
  }
  
  export default Sidebar