"use client";
import AuthContext from "@/context/AuthContext";
import { SocketContext } from "@/context/SocketContext";
import useConversation from "@/zustand/useConversation";
import { useContext } from "react";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { setHideSideBar } = useContext(AuthContext);

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useContext(SocketContext);
  const isOnline = onlineUsers.includes(conversation._id);

  const handleClick = () => {
    setSelectedConversation(conversation);
    // Only hide the sidebar on mobile
    if (window.innerWidth < 768) {
      setHideSideBar(true);
    }
    console.log("Selected conversation:", conversation); // Debug log
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer 
        ${isSelected ? "bg-sky-500" : ""}
        `}
        onClick={handleClick}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation?.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation?.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
