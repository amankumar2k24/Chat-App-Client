import { useContext } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import SocketContext from "@/context/SocketContext";
import AuthContext from "@/context/AuthContext";

const Sidebar = () => {
  const { onlineUsers } = useContext(SocketContext);
  const { authUser } = useContext(AuthContext);

  const restOnlineUsers = onlineUsers.filter(
    (user) => user !== authUser?.result?._id
  );

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col  h-[450px] md:h-[550px] ">
      <SearchInput />
      <div className="divider px-3 text-[#1d232a] font-bold">
        Online User:
        <span className="">{restOnlineUsers?.length}</span>
      </div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
