"use client";
import MessageContainer from "@/components/messages/MessageContainer";
import Sidebar from "@/components/sidebar/Sidebar";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Home = () => {
  const { authUser, hideSideBar } = useContext(AuthContext);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!authUser) {
      router.push("/login");
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on mount to set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, [authUser, router]);

  if (!authUser) {
    return null;
  }

  return (
    <div className="w-full sm:p-4 h-screen flex items-center justify-center">
      <div className="flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        {isMobile ? (
          <>
            {hideSideBar ? (
              <div className="flex h-[450px] md:h-[550px] ">
                <MessageContainer />
              </div>
            ) : (
              <div className="flex h-[450px] md:h-[550px] ">
                <Sidebar />
              </div>
            )}
          </>
        ) : (
          <>
            <Sidebar />
            <MessageContainer />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
