"use client";
import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { userLoginQuery } from "@/lib/hooks/authHooks";
import toast from "react-hot-toast";

const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const { authUser, setAuthUser, setHideSideBar } = useContext(AuthContext);
  const router = useRouter();

  const onUserLoginSuccess = (data) => {
    // console.log(data, "data");
    localStorage.setItem("chat-user", JSON.stringify(data.data));
    setAuthUser(data.data);
    router.push("/");
    setHideSideBar(false);
    toast.success(data?.data?.message);
  };

  const onUserLoginError = (error) => {
    const errorMessage = error.response?.data?.message || "Login failed";

    if (errorMessage.includes("username")) {
      setFieldError("username", errorMessage);
    } else if (errorMessage.includes("password")) {
      setFieldError("password", errorMessage);
    } else {
      toast.error(errorMessage);
    }
    console.log("Login error", error);
  };

  const { mutate: login, isLoading } = useMutation(userLoginQuery, {
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
    setFieldError,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login({ formData: values });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center w-auto sm:min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-300">
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

export default Login;

export const loginSchema = Yup.object({
  username: Yup.string().required("Please enter username"),
  password: Yup.string().min(6).required("Please enter password"),
});
