import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  role: string | null;
  username: string | null;
  setToken: (token: string | null) => void;
  setRole: (role: string | null) => void;
  setUsername: (username: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [role, setRoleState] = useState<string | null>(null);
  const [username, setUsernameState] = useState<string | null>(null);

  useEffect(() => {
    // Load from localStorage when app loads
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    const savedUsername = localStorage.getItem("username");
    if (savedToken) setTokenState(savedToken);
    if (savedRole) setRoleState(savedRole);
    if (savedUsername) setUsernameState(savedUsername);
  }, []);

  const setToken = (token: string | null) => {
    setTokenState(token);
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  };

  const setRole = (role: string | null) => {
    setRoleState(role);
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  };

  const setUsername = (username: string | null) => {
    setUsernameState(username);
    if (username) localStorage.setItem("username", username);
    else localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ token, role, username, setToken, setRole, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
