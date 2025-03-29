
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  businessName?: string;
  plan?: "free" | "standard" | "pro";
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, businessName: string, plan?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would validate credentials against a backend
      // and receive a user object and token
      const mockUser = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name: "Demo User",
        email,
        businessName: "Demo Business",
        plan: "free"
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, businessName: string, plan: string = "free") => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send registration data to a backend
      const newUser = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        businessName,
        plan
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
