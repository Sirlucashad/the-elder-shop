import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface User {
  username: string;
  rol: 'user' | 'admin';
}

interface AuthContextType {

  user: User | null;

  token: string | null;

  isAuthenticated: boolean;

  isAdmin: boolean;

  login: (
    token: string,
    user: User
  ) => void;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode;}) {

  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const isAuthenticated = !!user;

  const isAdmin =
    user?.rol === 'admin';

  const login = (
    token: string,
    userData: User
  ) => {

    setToken(token);

    setUser(userData);

    localStorage.setItem(
      'token',
      token
    );

    localStorage.setItem(
      'user',
      JSON.stringify(userData)
    );
  };

  const logout = () => {

    
    setToken(null);

    setUser(null);

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    toast.success('¡Regresa pronto!')
  };

  useEffect(() => {

    const storedToken =
      localStorage.getItem('token');

    const storedUser =
      localStorage.getItem('user');

    if (storedToken && storedUser) {

      setToken(storedToken);

      setUser(JSON.parse(storedUser));
    }

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        login,
        logout
      }
      }
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      'useAuthContext debe usarse dentro de AuthProvider'
    );
  }

  return context;
}