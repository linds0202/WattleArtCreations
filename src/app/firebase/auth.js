'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as authSignOut } from 'firebase/auth';
import { auth } from './firebase';
import { getUser } from './firestore';

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  const authStateChanged = async (user) => {
    setIsLoading(true);
    if (!user) {
        clear();
        return;
    } else {
      const userData = await getUser(user)

      setAuthUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        roles: userData.roles
      });
    }



    setIsLoading(false);
  }; 

  const signOut = () => authSignOut(auth).then(clear);

  // Listen for Firebase Auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    isLoading,
    signOut
  };
}

const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
  signOut: async () => {}
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>;
}

export const useAuth = () => useContext(AuthUserContext);