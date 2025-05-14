import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserType } from '../types';
import { mockUsers } from '../mockData';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, userType: UserType) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in (via localStorage in this mock version)
    const checkUserAuth = () => {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkUserAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock authentication
      const user = mockUsers.find(u => u.email === email);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        setIsAuthenticated(true);
        setError(null);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError('Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, userType: UserType) => {
    setLoading(true);
    try {
      // Mock registration
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        throw new Error('Email already in use');
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        userType,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      setError('Failed to register');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      setError('Failed to logout');
      throw err;
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    setLoading(true);
    try {
      if (!currentUser) {
        throw new Error('No user is currently logged in');
      }

      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      setError(null);
    } catch (err) {
      setError('Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        isAuthenticated,
        error,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
 