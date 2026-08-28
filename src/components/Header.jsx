import "./header.css";
function Header() {
    return (
      <header className="header">
        <span className="header-title">Organization Management</span>
  
        <div className="environment-toggle" aria-label="Environment">
          <button type="button" className="environment-option environment-option--active">
            WWW
          </button>
  
          <button type="button" className="environment-option">
            EDUIL
          </button>
        </div>
      </header>
    )
  }
  
  export default Header