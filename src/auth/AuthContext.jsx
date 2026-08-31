import {
  createContext,
  useContext,
  useState,
} from 'react';
import { signInRequest } from '../services/authApi';
import { isOzzyEmail } from './authUtils';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'ozzy_backoffice_auth';

const emptyAuth = {
  user: null,
  token: null,
};

function readStoredAuth() {
  const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY,);

  if (!storedAuth) {
    return emptyAuth;
  }

  try {
    const parsedAuth = JSON.parse(storedAuth);

    if (!parsedAuth?.user?.email ||!parsedAuth?.token)
     {
      localStorage.removeItem(AUTH_STORAGE_KEY);

      return emptyAuth;
    }

    return parsedAuth;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);

    return emptyAuth;
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth);

  const signIn = async (email, password) => {
    const result = await signInRequest(
      email,
      password,
    );

    const nextAuth = {
      user: {
        email,
      },
      token: result.token,
    };

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(nextAuth),
    );

    setAuth(nextAuth);

    return result;
  };

  const signOut = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuth(emptyAuth);
  };

  const isEditor = isOzzyEmail(
    auth.user?.email,
  );

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        token: auth.token,
        isLoading: false,
        isEditor,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}