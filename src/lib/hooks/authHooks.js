import { useMutation } from "react-query";
import axiosInterceptor from "../interceptor/axiosInterceptor";

//login
export const useUserLogin = async ({ formData }) => {
  const response = await axiosInterceptor.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    formData,
    { withCredentials: true }
  );
  return response;
};

//register
export const useUserRegister = async ({ formData }) => {
  const response = await axiosInterceptor.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    formData,
    { withCredentials: true }
  );
  return response;
};

//logout
const logout = async () => {
  const response = await axiosInterceptor.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response;
};

export const useUserLogout = (onUserLogoutSuccess, onUserLogoutError) => {
  return useMutation(logout, {
    onSuccess: onUserLogoutSuccess,
    onError: onUserLogoutError,
  });
};
