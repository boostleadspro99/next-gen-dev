import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  signOut as firebaseSignOut,
  getIdTokenResult
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { initializeClientData } from '../services/firestore';
import type { UserData, ClientData } from '../types/db';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserData | null;
  clientData: ClientData | null;
  loading: boolean;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserData | null>(null);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // 1. Verify Custom Claims (Super Admin Status)
          const tokenResult = await getIdTokenResult(user, true); // Force refresh to get latest claims
          const isSuper = tokenResult.claims.role === 'super_admin';
          setIsSuperAdmin(isSuper);

          // 2. Fetch Basic User Profile from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            setUserProfile(userDocSnap.data() as UserData);
          }

          // 3. Attempt to Initialize Client Data (Seeding)
          // This ensures that even if registration seeding failed, critical collections exist.
          // Note: Super Admin might not need this, but good to have for initial setup.
          await initializeClientData(user);

          // 4. Fetch Client Business Data
          const clientDocRef = doc(db, 'clients', user.uid);
          const clientDocSnap = await getDoc(clientDocRef);

          if (clientDocSnap.exists()) {
            setClientData(clientDocSnap.data() as ClientData);
          }

        } catch (error) {
          console.error("Error initializing user session:", error);
        }
      } else {
        setUserProfile(null);
        setClientData(null);
        setIsSuperAdmin(false);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await firebaseSignOut(auth);
    setCurrentUser(null);
    setUserProfile(null);
    setClientData(null);
    setIsSuperAdmin(false);
  };

  const value = {
    currentUser,
    userProfile,
    clientData,
    loading,
    logout,
    isAdmin: isSuperAdmin, // Map isSuperAdmin to isAdmin for backward compatibility
    isSuperAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
