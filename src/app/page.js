"use client";
import MessageContainer from "@/components/messages/MessageContainer";
import Sidebar from "@/components/sidebar/Sidebar";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const Home = () => {
  const { authUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.push("/login");
    }
  }, [authUser, router]);

  if (!authUser) {
    return null;
  }

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};
export default Home;
