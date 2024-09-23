"use client";
import useLogout from "@/hooks/useLogout";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  const router = useRouter();
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
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
