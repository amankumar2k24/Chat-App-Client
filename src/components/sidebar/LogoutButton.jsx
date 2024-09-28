"use client";
import AuthContext from "@/context/AuthContext";
import { useUserLogout } from "@/lib/hooks/authHooks";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  const router = useRouter();
  const { setAuthUser } = useContext(AuthContext);

  const onUserLogoutSuccess = () => {
    toast.success("Logout successfully");
    router.push("/login");
    localStorage.removeItem("chat-user");
    setAuthUser(null);
  };

  const onUserLogoutError = (error) => {
    router.push("/login");
    console.log(error);
  };

  const { mutateAsync: logout, isLoading } = useUserLogout(
    onUserLogoutSuccess,
    onUserLogoutError
  );

  return (
    <div className="mt-auto">
      {!isLoading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};
export default LogoutButton;
