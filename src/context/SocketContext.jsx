"use client";
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import AuthContext from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  // console.log("socket from socketio", socket);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { authUser } = useContext(AuthContext);

  // console.log("authUser from socketio", authUser);
  const socketURL =
    "http://localhost:8000" ||
    "https://chat-app-server-q5nw.onrender.com/api/v1";

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8000", {
        // const socket = io(socketURL, {
        query: { userId: authUser?.result?._id },
      });
      setSocket(socket);

      // console.log("Socket connected:", socket.connected);

      //socket.on() is used to listen to the event emitted by the server
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
        onlineUsers,
        setOnlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
