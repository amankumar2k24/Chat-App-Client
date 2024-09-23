import { useMutation } from "react-query";
import axiosInterceptor from "../interceptor/axiosInterceptor";

//login
export const userLoginQuery = async ({ formData }) => {
  const response = await axiosInterceptor.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    formData,
    { withCredentials: true }
  );
  console.log("response coming from userLogin APi", response);
  return response;
};

//register
export const userRegisterQuery = async ({ formData }) => {
  const response = await axiosInterceptor.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    formData,
    { withCredentials: true }
  );
  console.log("response coming from userRegister APi", response);
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

export const userLogoutQuery = (onUserLogoutSuccess, onUserLogoutError) => {
  return useMutation(logout, {
    onSuccess: onUserLogoutSuccess,
    onError: onUserLogoutError,
  });
};
