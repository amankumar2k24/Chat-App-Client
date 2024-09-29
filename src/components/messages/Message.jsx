"use client";
import AuthContext from "@/context/AuthContext";
import { extractTime } from "@/utils/extractTime";
import useConversation from "@/zustand/useConversation";
import { useContext } from "react";

const Message = ({ message }) => {
  const { authUser } = useContext(AuthContext);
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser?.result?._id;

  console.log("fromMe", message.senderId);
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser?.result?.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-6 md:w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`px-2 py-2 rounded-lg flex justify-center items-center md:chat-bubble text-[13px] leading-3 md:leading-5 md:text-[16px] text-white ${bubbleBgColor} ${shakeClass}`}
      >
        {message?.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;
