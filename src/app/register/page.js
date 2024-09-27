"use client";
import Link from "next/link";
import { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { userRegisterQuery } from "@/lib/hooks/authHooks";
import toast from "react-hot-toast";
import { validateXSS } from "@/utils/validateXSS";

const Register = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const router = useRouter();

  const onUserRegisterSuccess = (data) => {
    toast.success("User registered successfully");
    router.push("/login");
  };

  const onUserRegisterError = (error) => {
    const errorMessage = error.response.data.message;

    if (errorMessage.includes("username")) {
      setFieldError("username", errorMessage);
    } else if (errorMessage.includes("password")) {
      setFieldError("password", errorMessage);
    } else {
      toast.error(error.response.data.message);
    }
  };

  const { mutateAsync: register, isLoading } = useMutation(userRegisterQuery, {
    onSuccess: onUserRegisterSuccess,
    onError: onUserRegisterError,
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldError,
    setFieldValue,
  } = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      await register({ formData: values });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full input input-bordered  h-10"
              name="fullName"
              id="fullName"
              value={values.fullName}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors?.fullName && touched?.fullName ? (
              <div className="text-red-700">{errors?.fullName}</div>
            ) : (
              ""
            )}
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
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

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <div className="relative">
              <input
                type={"password"}
                placeholder="Enter Password"
                className="w-full input input-bordered h-10"
                name="confirmPassword"
                id="confirmPassword"
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setTogglePassword(!togglePassword)}
              ></button>
              {errors?.confirmPassword && touched?.confirmPassword ? (
                <div className="text-red-700">{errors?.confirmPassword}</div>
              ) : (
                ""
              )}
            </div>
          </div>

          <GenderCheckbox
            onCheckboxChange={(gender) => setFieldValue("gender", gender)}
            selectedGender={values.gender}
            errors={errors}
            touched={touched}
          />
          {touched.gender && errors.gender && (
            <div className="text-red-700 -mt-2">{errors.gender}</div>
          )}

          <Link
            href={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>

          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

export const registerSchema = Yup.object({
  fullName: Yup.string().required("Fullname is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  gender: Yup.string().required("Please select any gender"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required")
    .test("xss", "XSS Attack Detected", validateXSS),
});
