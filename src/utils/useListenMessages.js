"use client";
import { useContext, useEffect } from "react";
import notificationSound from "../public/sounds/notification.mp3";
import useConversation from "@/zustand/useConversation";
import { SocketContext } from "@/context/SocketContext";

const useListenMessages = () => {
  const { socket } = useContext(SocketContext);
  const { messages, setMessages } = useConversation();
  // console.log("messages=>", messages);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;

      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
