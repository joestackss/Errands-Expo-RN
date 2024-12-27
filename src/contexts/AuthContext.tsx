import React, { createContext, useContext } from "react";
import { AuthUser } from "../types";
import { useAuth } from "../hooks/useAuth";

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ user: AuthUser | null; error: Error | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ user: AuthUser | null; error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
