import axios from "axios";
import { useQuery } from "react-query";

const getUsersConveration = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/user/get-users`,
    { withCredentials: true }
  );
  return response;
};

export const useGetUsersConversationQuery = (onSucess, onError) => {
  return useQuery(getUsersConveration, {
    onSucess: onSucess,
    onError: onError,
  });
};
