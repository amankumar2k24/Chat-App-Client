"use client";
import { useState, useEffect, useContext } from "react";
import Conversation from "./Conversation";
import { getRandomEmoji } from "@/utils/emojis";
import { useGetUsersConversationQuery } from "@/lib/hooks/userHooks";
import AuthContext from "@/context/AuthContext";

const Conversations = () => {
  const { conversations, setConversations } = useContext(AuthContext);
  console.log("conversations=>", conversations);

  const onGetUserConversationSuccess = (data) => {
    setConversations(data);
  };

  const onGetUserConversationError = (error) => {
    console.log("Error fetching conversations:", error);
  };

  const { data, isLoading } = useGetUsersConversationQuery(
    onGetUserConversationSuccess,
    onGetUserConversationError
  );

  return (
    <div className="py-2 flex flex-col overflow-auto scrollbar">
      {isLoading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : conversations.length > 0 ? (
        conversations.map((conversation, idx) => {
          return (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              emoji={getRandomEmoji()}
              lastIdx={idx === conversations.length - 1}
            />
          );
        })
      ) : (
        <p>No conversations found.</p>
      )}
    </div>
  );
};

export default Conversations;
