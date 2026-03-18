"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isFirstLogin: boolean;
  login: (role: string) => void;
  logout: () => void;
  completeFirstLogin: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isFirstLogin: true,
  login: () => {},
  logout: () => {},
  completeFirstLogin: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("isFirstLogin");
      return stored === null ? true : stored === "true";
    }
    return true;
  });

  const login = (_role: string) => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  
  const completeFirstLogin = () => {
    setIsFirstLogin(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("isFirstLogin", "false");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isFirstLogin, login, logout, completeFirstLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
