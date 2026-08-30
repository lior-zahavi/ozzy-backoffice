import { useState } from "react";
import {sendPasswordResetEmail, signInWithEmailAndPassword,} from "firebase/auth";
import {auth, isFirebaseConfigured,} from "../services/firebase";
import { useNavigate } from "react-router-dom";
import AuthField from "../auth/AuthField";
import AuthLayout from "../auth/AuthLayout";
import { isOzzyEmail } from "../auth/authUtils";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const clearFeedback = () => {
    setError("");
    setMessage("");
  };
  
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    clearFeedback();

    const normalizedEmail = email.trim().toLowerCase();

    if (!isOzzyEmail(normalizedEmail)) {
      setError("Please use your @ozzystory.com email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if(!isFirebaseConfigured||!auth){
        setError("Authentication is not configured yet.");
        return;
    }
    try{
        setIsSubmitting(true);
        await signInWithEmailAndPassword(auth, normalizedEmail, password,);
        navigate('/organizations', { replace: true });
    }
    catch(firebaseError){
        if(firebaseError.code==="auth/multi-factor-auth-required"){
            setError("Additional verification is required.");
            return;
        }
        setError("Unable to sign in. Check your email and password.");
    }
     finally {
      setIsSubmitting(false)
    }
    
  }

  const handlePasswordReset = async (event) => {
    event.preventDefault();
  
    setError("");
    setMessage("");
  
    const normalizedEmail = email.trim().toLowerCase();
  
    if (!isOzzyEmail(normalizedEmail)) {
      setError("Please enter your @ozzystory.com email address.");
      return;
    }
  
    if (!isFirebaseConfigured || !auth) {
      setError("Authentication is not configured yet.");
      return;
    }
  
    try {
      setIsSubmitting(true);
  
      await sendPasswordResetEmail(auth, normalizedEmail);
  
      setMessage("Password reset instructions were sent to your email.");
    } catch {
      setError("Unable to send a password reset email. Please try again.");
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
        onSubmit={isResetMode ? handlePasswordReset : handleSignIn}>
        <AuthField
          id="email"
          label="Email Address"
          icon="mail"
          type="email"
          value={email}
          autoComplete="email"
          placeholder="editor@ozzystory.com"
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'auth-error' : undefined}
          required
        />
  
        {!isResetMode && (
          <AuthField
            id="password"
            label="Password"
            icon="lock"
            type="password"
            value={password}
            autoComplete="current-password"
            placeholder="••••••••"
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'auth-error' : undefined}
            required
            action={
              <button
                className="auth-text-button"
                type="button"
                onClick={showResetForm}
                disabled={isSubmitting}>
                Forgot Password?
              </button>
            }
          />
        )}
  
        {isResetMode && (
          <p className="auth-instructions">
            Enter your work email to receive reset instructions.
          </p>
        )}
  
        {error && (
          <p  id="auth-error" className="auth-message auth-message--error" role="alert">
            {error}
          </p>
        )}
  
        {message && (
          <p className="auth-message auth-message--success" role="status">
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
              ? 'Please wait...'
              : isResetMode
                ? 'Send Reset Email'
                : 'Sign In'}
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
          Back to Sign In
        </button>
      )}
    </AuthLayout>
  )

}

export default LoginPage;