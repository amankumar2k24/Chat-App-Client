import { useEffect, useRef } from "react";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../utils/useListenMessages";
import useConversation from "@/zustand/useConversation";
import { useGetUsersMessageQuery } from "@/lib/hooks/userHooks";

const Messages = () => {
  const { selectedConversation, messages, setMessages } = useConversation();

  const onGetUserMessageSuccess = (data) => {
    setMessages(data?.result || []);
  };

  const onGetUserMessageError = (error) => {
    console.log(error);
  };

  const { data, loading } = useGetUsersMessageQuery(
    selectedConversation?._id,
    onGetUserMessageSuccess,
    onGetUserMessageError
  );

  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  // Check if messages is an array before mapping
  // const isMessagesArray = Array.isArray(messages);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages?.length > 0 &&
        messages?.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages?.length === 0 && (
        <p className="text-center text-[12px] h-full flex justify-center items-center md:text-[16px]">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
export default Messages;
