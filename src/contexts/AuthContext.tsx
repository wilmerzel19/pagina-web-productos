import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { onAuthChange, loginUser, logoutUser, registerUser } from '../services/authService';

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setCurrentUser(user);
      setLoading(false);
      
      // In a real application, you might want to check if the user has admin rights
      // This could be done by checking a role in Firestore
      // For now, we'll just assume any authenticated user is an admin
      setIsAdmin(!!user);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setError(null);
    try {
      await loginUser(email, password);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  };

  const logout = async (): Promise<void> => {
    setError(null);
    try {
      await logoutUser();
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  };

  const register = async (email: string, password: string): Promise<void> => {
    setError(null);
    try {
      await registerUser(email, password);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  };

  const value = {
    currentUser,
    isAdmin,
    loading,
    login,
    logout,
    register,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};