import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from './api';
import { useLoginMutation, useRegisterMutation } from './query-hooks';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string, role?: string, educationLevel?: string) => Promise<{ requires_otp?: boolean, email?: string }>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = apiService.getUser();
    const storedToken = apiService.getToken();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }

    setIsBootstrapping(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginMutation.mutateAsync({ email, password });

    if (response.data?.token && response.data?.user) {
      apiService.setToken(response.data.token);
      apiService.setUser(response.data.user);
      setToken(response.data.token);
      setUser(response.data.user);
    } else {
      throw new Error('Invalid response from server');
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role?: string,
    educationLevel?: string
  ) => {
    const response = await registerMutation.mutateAsync({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      role,
      education_level: educationLevel,
    });

    if (response.data?.requires_otp) {
      return { requires_otp: true, email: response.data.email };
    }

    if (response.data?.token && response.data?.user) {
      apiService.setToken(response.data.token);
      apiService.setUser(response.data.user);
      setToken(response.data.token);
      setUser(response.data.user as any);
      return { requires_otp: false };
    } else {
      throw new Error('Invalid response from server');
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    const response = await apiService.verifyOTP(email, otp);
    if (response.data?.token && response.data?.user) {
      apiService.setToken(response.data.token);
      apiService.setUser(response.data.user);
      setToken(response.data.token);
      setUser(response.data.user as any);
    } else {
      throw new Error(response.message || 'OTP verification failed');
    }
  };

  const logout = () => {
    apiService.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading: isBootstrapping || loginMutation.isPending || registerMutation.isPending,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
        setUser,
        verifyOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
