import { useState } from "react";
import "./login-page.css";
import {sendPasswordResetEmail, signInWithEmailAndPassword,} from "firebase/auth";
import {auth, isFirebaseConfigured,} from "../services/firebase";
import { useNavigate } from "react-router-dom";


const isOzzyEmail = (email) => {
  return /^[^@\s]+@ozzystory\.com$/i.test(email.trim());
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

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
    setError("");
    setMessage("");
  }
  
  const showSignInForm = () => {
    setIsResetMode(false);
    setError("");
    setMessage("");
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-logo">Ozzy</div>

        <h1>{isResetMode ? "Reset password" : "Sign in"}</h1>

        <p className="login-description">
          {isResetMode
            ? "Enter your work email to receive reset instructions."
            : "Sign in to access the Ozzy Backoffice."}
        </p>

        <form
          className="login-form"
          onSubmit={isResetMode ? handlePasswordReset : handleSignIn}
        >
          <div className="form-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              value={email}
              autoComplete="email"
              placeholder="name@ozzystory.com"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          {!isResetMode && (
            <div className="form-field">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                value={password}
                autoComplete="current-password"
                placeholder="Enter your password"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
          )}

          {error && (
            <p className="form-message form-message--error" role="alert">
              {error}
            </p>
          )}

          {message && (
            <p className="form-message form-message--success" role="status">
              {message}
            </p>
          )}

          <button className="login-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Please wait..." : isResetMode?"Send reset email":"Sign In"}
          </button>
        </form>

        <button
  className="login-link"
  type="button"
  onClick={isResetMode ? showSignInForm : showResetForm}
  disabled={isSubmitting}
>
  {isResetMode ? 'Back to Sign In' : 'Forgot Password?'}
</button>
      </section>

      <footer className="login-footer">
        Protected system. Authorized users only.
      </footer>
    </main>
  )
}

export default LoginPage;