import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import "./header.css";

const headerActions = [
  {
    labelKey: 'backoffice.common.notifications',
    icon: "notifications",
  },
  {
    labelKey: 'backoffice.common.help',
    icon: "help",
  },
]

function Header() {
  const { t } = useTranslation();
  return (
    <header className="header">
      <span className="header-title">{t('backoffice.orgManagement.pageTitle')}</span>

      <div className="header-actions">
        <div className="environment-toggle" aria-label="Current environment">
          <span className="environment-option">WWW</span>

          <span className="environment-option environment-option--active">
            EDUIL
          </span>
        </div>

        <LanguageSwitcher />

        {headerActions.map((action) => (
          <button
            key={action.labelKey}
            className="header-icon-button"
            type="button"
            aria-label={t(action.labelKey)}>

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
          aria-label={t('backoffice.common.userAccount')}>
          L
        </button>
      </div>
    </header>
  )
}

export default Header;
