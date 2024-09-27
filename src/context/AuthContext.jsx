"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get the stored user from localStorage
      const storedUser = localStorage.getItem("chat-user");

      // Check if the stored user is a valid JSON string before parsing
      try {
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setAuthUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        // Clear out invalid data if necessary
        localStorage.removeItem("chat-user");
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, conversations, setConversations }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
  