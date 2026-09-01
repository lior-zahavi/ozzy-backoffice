import { useTranslation } from 'react-i18next';
import "./sidebar.css";
const navItems = [
    { labelKey: "backoffice.sidebar.dashboard", icon:"dashboard", isStub: true },
    { labelKey: "backoffice.sidebar.organizations", icon:"domain", isActive: true },
    { labelKey: "backoffice.sidebar.content", icon:"article", isStub: true },
    { labelKey: "backoffice.sidebar.settings", icon:"settings", isStub: true },
  ]
  
  function Sidebar() {
    const { t } = useTranslation();
    return (
      <aside className="sidebar">
        <div className="sidebar-brand">
        <span className="sidebar-brand-name">{t('backoffice.sidebar.title')}</span>
        <span className="sidebar-brand-subtitle">
          {t('backoffice.sidebar.subtitle')}
        </span>
      </div>
  
        <nav
          className="sidebar-nav"
          aria-label={t('backoffice.common.mainNavigation')}
        >
          {navItems.map((item) => (
            <button key={item.labelKey} type="button"
                className={`nav-item ${item.isActive ? 'nav-item--active' : ''}`}
                aria-current={item.isActive ? 'page' : undefined}>

            <span className="material-symbols-outlined nav-item-icon"
              aria-hidden="true">
              {item.icon}
            </span>
            <span>{t(item.labelKey)}</span>
            {item.isStub && (
              <span className="visually-hidden">
                {t('backoffice.common.comingSoon')}
              </span>
            )}
               
            </button>
          ))}
        </nav>
      </aside>
    )
  }
  
  export default Sidebar;
