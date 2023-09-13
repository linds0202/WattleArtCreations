'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as authSignOut } from 'firebase/auth';
import { auth } from './firebase';
import { getUser } from './firestore';

export interface AuthUserData {
  uid: string | null,
  email: string | null,
  displayName: string | null | undefined,
  roles: string | null,
  oldEnough: boolean
}

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<AuthUserData | null>({
    uid: null,
    email: null,
    displayName: null,
    roles: null,
    oldEnough: false
  });
  const [isLoading, setIsLoading] = useState<any>(true);

  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  const authStateChanged = async (user: any) => {
    setIsLoading(true);
    if (!user) {
        clear();
        return;
    } else {
      const userData: any = await getUser(user)

      setAuthUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        roles: userData.roles,
        oldEnough: userData.oldEnough
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
    setAuthUser,
    isLoading,
    signOut
  };
}

const AuthUserContext = createContext({
  authUser: null,
  setAuthUser: async (authUser: any) => {},
  isLoading: true,
  signOut: async () => {}
});

export function AuthUserProvider({ children }: any) {
  const auth: any = useFirebaseAuth();
  return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>;
}

export const useAuth = () => useContext<any>(AuthUserContext);