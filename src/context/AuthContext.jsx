"use client";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [isSSR, setIsSSR] = useState(true); // New flag to handle SSR
  const [hideSideBar, setHideSideBar] = useState(false);

  useEffect(() => {
    setIsSSR(false); // Set flag to false once the component mounts (only on the client)
    const storedUser = localStorage.getItem("chat-user");
    if (storedUser) {
      try {
        setAuthUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("chat-user");
      }
    }
  }, []);

  // If it's still SSR, don't render anything to avoid hydration mismatch
  if (isSSR) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        conversations,
        setConversations,
        hideSideBar,
        setHideSideBar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
