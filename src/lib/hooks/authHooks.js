import axiosInterceptor from "../interceptor/axiosInterceptor";

export const userLogin = async ({ formData }) => {
  const response = await axiosInterceptor.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    formData,
    { withCredentials: true }
  );
  console.log("response coming from userLogin APi", response);
  return response;
};
