import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context state
interface UserContextType {
  role: string | null;
  login: (role: string) => void;
  logout: () => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);

  const login = (selectedRole: string) => {
    setRole(selectedRole);
  };

  const logout = () => {
    setRole(null);
  };

  return (
    <UserContext.Provider value={{ role, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
