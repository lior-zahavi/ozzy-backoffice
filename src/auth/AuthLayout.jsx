import { useTranslation } from 'react-i18next';
import "./auth.css";

function AuthLayout({ children }) {
  const { t } = useTranslation();
  return (
    <main className="auth-page">
      <div className="auth-environment-bar" aria-hidden="true" />

      <div className="auth-content">
        <section className="auth-card">
          <div className="auth-card-glow" aria-hidden="true" />

          <header className="auth-brand">
            <h1>{t('backoffice.sidebar.title')}</h1>
            <p>{t('backoffice.sidebar.subtitle')}</p>
          </header>
            {children}
        </section>
      </div>

      <footer className="auth-footer">
        <span
          className="material-symbols-outlined auth-footer-icon"
          aria-hidden="true">
          security
        </span>

        <p>{t('backoffice.login.footer')}</p>
      </footer>
    </main>
  )
}

export default AuthLayout;