"use client";
import useConversation from "@/zustand/useConversation";
import { useContext, useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import AuthContext from "@/context/AuthContext";
import { TiMessages, TiArrowBack } from "react-icons/ti";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { setHideSideBar } = useContext(AuthContext);

  useEffect(() => {
    // console.log("selectedConversation==>", selectedConversation);
    // cleanup function (unmounts)
    // return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-[265px] md:w-auto md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2 flex items-center justify-between">
            <div>
              <span className="label-text">To:</span>{" "}
              <span className="text-gray-900 font-bold">
                {selectedConversation?.fullName}
              </span>
            </div>
            <div
              onClick={() => setHideSideBar(false)}
              className="cursor-pointer"
            >
              <TiArrowBack size={20} />
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
