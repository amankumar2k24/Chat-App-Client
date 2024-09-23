"use client";
import AuthContext from "@/context/AuthContext";
// import useLogin from "@/hooks/useLogin";

import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { userLogin } from "@/lib/hooks/authHooks";
import toast from "react-hot-toast";

const page = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const { authUser } = useContext(AuthContext);
  console.log("authUser from Login page", authUser);
  const router = useRouter();
  // const { loading, login } = useLogin();

  // useEffect(() => {
  //   if (authUser) {
  //     router.push("/");
  //   }
  // }, [authUser, router]);

  // if (authUser) {
  //   return null;
  // }

  const onUserLoginSuccess = (data) => {
    console.log("Login success", data);
    router.push("/");
  };

  const onUserLoginError = (error) => {
    toast.error(error.response.data.message);
    console.log("Login error", error);
  };

  const { mutate: login, isLoading } = useMutation(userLogin, {
    onSuccess: onUserLoginSuccess,
    onError: onUserLoginError,
  });

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("Submitting values", values);
      login({ formData: values });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              name="username"
              id="username"
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors?.username && touched?.username ? (
              <div className="text-red-700">{errors?.username}</div>
            ) : (
              ""
            )}
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={togglePassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full input input-bordered h-10"
                name="password"
                id="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setTogglePassword(!togglePassword)}
              >
                {togglePassword ? (
                  <IoIosEye size={20} className="absolute top-2 right-2" />
                ) : (
                  <IoIosEyeOff size={20} className="absolute top-2 right-2" />
                )}
              </button>
              {errors?.password && touched?.password ? (
                <div className="text-red-700">{errors?.password}</div>
              ) : (
                ""
              )}
            </div>
          </div>
          <Link
            href="/register"
            className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;

export const loginSchema = Yup.object({
  username: Yup.string().required("Please enter username"),
  password: Yup.string().min(6).required("Please enter password"),
});
