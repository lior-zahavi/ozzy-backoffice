import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthField from '../auth/AuthField';
import AuthLayout from '../auth/AuthLayout';
import { useAuth } from '../auth/AuthContext';
import { isOzzyEmail } from '../auth/authUtils';
import { requestPasswordReset } from '../services/authApi';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { t } = useTranslation();

  const clearFeedback = () => {
    setError('');
    setMessage('');
  }

  const handleApiError = (apiError) => {
    if (apiError.status === 401) {
      setError(t('backoffice.login.invalidCredentials'));
      return;
    }

    if (apiError.status === 403) {
      setError(t('backoffice.login.unauthorized'));
      return;
    }

    if (apiError.status === 0) {
      setError(t('backoffice.login.apiNotConfigured'));
      return;
    }

    setError(t('backoffice.login.requestFailed'));
  }

  const handleSignIn = async (event) => {
    event.preventDefault();
    clearFeedback();

    const normalizedEmail = email.trim().toLowerCase();

    if (!isOzzyEmail(normalizedEmail)) {
      setError(t('backoffice.login.invalidDomain'));
      return;
    }

    if (!password) {
      setError(t('backoffice.login.passwordRequired'));
      return;
    }

    try {
      setIsSubmitting(true);

      await signIn(normalizedEmail, password);

      navigate('/organizations', {replace: true,});
    } catch (apiError) {
      handleApiError(apiError);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    clearFeedback();

    const normalizedEmail = email.trim().toLowerCase();

    if (!isOzzyEmail(normalizedEmail)) {
      setError(t('backoffice.login.resetInvalidDomain'));
      return;
    }

    try {
      setIsSubmitting(true);

      await requestPasswordReset(normalizedEmail);

      setMessage(t('backoffice.login.resetSuccess'));
    } catch (apiError) {
      handleApiError(apiError);
    } finally {
      setIsSubmitting(false);
    }
  }

  const showResetForm = () => {
    setIsResetMode(true);
    clearFeedback();
  }

  const showSignInForm = () => {
    setIsResetMode(false);
    clearFeedback();
  }

  return (
    <AuthLayout>
      <form
        className="auth-form"
        onSubmit={isResetMode? handlePasswordReset: handleSignIn}
      >
        <AuthField
          id="email"
          label={t('backoffice.login.email')}
          icon="mail"
          type="email"
          value={email}
          autoComplete="email"
          placeholder={t('backoffice.login.emailPlaceholder')}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'auth-error' : undefined}
          required
        />

        {!isResetMode && (
          <AuthField
            id="password"
            label={t('backoffice.login.password')}
            icon="lock"
            type="password"
            value={password}
            autoComplete="current-password"
            placeholder="••••••••"
            onChange={(event) =>setPassword(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'auth-error' : undefined}
            required
            action={
              <button
                className="auth-text-button"
                type="button"
                onClick={showResetForm}
                disabled={isSubmitting}
              >
                {t('backoffice.login.forgotPassword')}
              </button>
            }
          />
        )}

        {isResetMode && (
          <p className="auth-instructions">
            {t('backoffice.login.resetInstructions')}
          </p>
        )}

        {error && (
          <p
            id="auth-error"
            className="auth-message auth-message--error"
            role="alert"
          >
            {error}
          </p>
        )}

        {message && (
          <p
            className="auth-message auth-message--success"
            role="status"
          >
            {message}
          </p>
        )}

        <button
          className="auth-submit"
          type="submit"
          disabled={isSubmitting}
        >
          <span>
            {isSubmitting
              ? t('backoffice.login.pleaseWait')
              : isResetMode
                ? t('backoffice.login.sendResetEmail')
                : t('backoffice.login.submit')}
          </span>

          {!isResetMode && (
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
            >
              arrow_forward
            </span>
          )}
        </button>
      </form>

      {isResetMode && (
        <button
          className="auth-back-button"
          type="button"
          onClick={showSignInForm}
          disabled={isSubmitting}
        >
          {t('backoffice.login.backToSignIn')}
        </button>
      )}
    </AuthLayout>
  )
}

export default LoginPage;
