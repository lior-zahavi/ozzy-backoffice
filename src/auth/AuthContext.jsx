import { createContext, useContext, useEffect, useState } from "react";
import { multiFactor, onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { isOzzyEmail } from "../auth/authUtils";

const AuthContext = createContext(null);



export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(auth));
  useEffect(() => {
    if (!auth) {
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    })

    return unsubscribe;
  }, [])

  const isEditor = isOzzyEmail(user?.email);

  const hasMfa =Boolean(user) && 
                multiFactor(user).enrolledFactors.length > 0;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isEditor,
        hasMfa,
      }}>{children}</AuthContext.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}