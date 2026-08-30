import "./auth.css";

function AuthLayout({ children }) {
  return (
    <main className="auth-page">
      <div className="auth-environment-bar" aria-hidden="true" />

      <div className="auth-content">
        <section className="auth-card">
          <div className="auth-card-glow" aria-hidden="true" />

          <header className="auth-brand">
            <h1>Ozzystory</h1>
            <p>Editorial Backoffice</p>
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

        <p>Protected system. Authorized personnel only.</p>
      </footer>
    </main>
  )
}

export default AuthLayout;