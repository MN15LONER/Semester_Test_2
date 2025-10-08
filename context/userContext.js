import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (name, email, age) => {
    setUser({ name, email, age });
  };

  const logout = () => setUser(null);

  
  const updateProfile = (updates) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updates, // merge updates with existing user
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
