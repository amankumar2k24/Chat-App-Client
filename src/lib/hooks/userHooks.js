  import axios from "axios";
  import { useQuery } from "react-query";
  import axiosInterceptor from "../interceptor/axiosInterceptor";

  const getUsersConversation = async () => {
    const response = await axiosInterceptor.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/get-users`,
      { withCredentials: true }
    );
    return response.data;
  };

  export const useGetUsersConversationQuery = (
    onGetUserConversationSuccess,
    onGetUserConversationError
  ) => {
    return useQuery("user-conversation", getUsersConversation, {
      onSuccess: onGetUserConversationSuccess,
      onError: onGetUserConversationError,
    });
  };

  const getUsersMessage = async ({ queryKey }) => {
    const id = queryKey[1];
    const response = await axiosInterceptor.get(
      `${process.env.NEXT_PUBLIC_API_URL}/message/get-message/${id}`
    );
    return response.data;
  };

  export const useGetUsersMessageQuery = (data, onSuccess, onError) => {
    return useQuery(["user-message", data], getUsersMessage, {
      onSuccess: onSuccess,
      onError: onError,
    });
  };

  export const sendUserConversation = async ({ message, id }) => {
    const response = await axiosInterceptor.post(
      `${process.env.NEXT_PUBLIC_API_URL}/message/send-message/${id}`,
      { message },
      { withCredentials: true }
    );

    return response.data;
  };
