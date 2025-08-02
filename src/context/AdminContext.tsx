import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AdminContextType, AdminUser, LoginCredentials } from '../types/admin';
import { FirebaseService } from '../services/firebaseService';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('admin-session');
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        if (sessionData.expiresAt > Date.now()) {
          setIsAuthenticated(true);
          setUser(sessionData.user);
        } else {
          localStorage.removeItem('admin-session');
        }
      } catch (error) {
        console.error('Error restoring session:', error);
        localStorage.removeItem('admin-session');
      }
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Try Firebase authentication first
      let isValid = false;
      
      try {
        isValid = await FirebaseService.authenticateAdmin(
          credentials.username, 
          credentials.password
        );
      } catch (firebaseError) {
        console.warn('Firebase auth failed, using temporary auth:', firebaseError);
        
        // Fallback to temporary authentication if Firebase fails
        const { TempAuthService } = await import('../services/tempAuthService');
        isValid = TempAuthService.authenticate(credentials.username, credentials.password);
        
        if (isValid) {
          console.log('🔧 Using temporary authentication - Configure Firebase rules to use full features');
        }
      }
      
      if (isValid) {
        const adminUser: AdminUser = {
          id: 'admin-1',
          username: credentials.username,
          password: '', // Don't store password
          role: 'admin',
          createdAt: new Date()
        };
        
        setIsAuthenticated(true);
        setUser(adminUser);
        
        // Save session (expires in 24 hours)
        const sessionData = {
          user: adminUser,
          expiresAt: Date.now() + (24 * 60 * 60 * 1000)
        };
        localStorage.setItem('admin-session', JSON.stringify(sessionData));
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('admin-session');
  };

  const value: AdminContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};