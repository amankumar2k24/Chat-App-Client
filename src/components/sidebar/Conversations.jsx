"use client";
import useGetConversations from "@/unused-hooks/useGetConversations";
import Conversation from "./Conversation";
import { getRandomEmoji } from "@/utils/emojis";
import { useGetUsersConversationQuery } from "@/lib/hooks/userHooks";

const Conversations = () => {
  const onGetUserConversationSuccess = (data) => {
    console.log("conversations", data);
  };
  const onGetUserConversationError = (error) => {
    console.log("error", error);
  };

  const { loading, conversations } = useGetUsersConversationQuery(
    onGetUserConversationSuccess,
    onGetUserConversationError
  );
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations &&
        conversations?.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length - 1}
          />
        ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default Conversations;
