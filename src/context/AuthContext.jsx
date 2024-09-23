"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("chat-user"));
      if (storedUser) {
        setAuthUser(storedUser);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
