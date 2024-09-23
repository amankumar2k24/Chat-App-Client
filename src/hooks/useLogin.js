// "use client";
// import AuthContext from "@/context/AuthContext";
// import { useContext, useState } from "react";
// import toast from "react-hot-toast";

// const useLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const { setAuthUser } = useContext(AuthContext);

//   const login = async (username, password) => {
//     const success = handleInputErrors(username, password);
//     if (!success) return;
//     setLoading(true);
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await res.json();

//       if (!res.ok || data.error) {
//         throw new Error(data.error || "Invalid login credentials.");
//       }

//       localStorage.setItem("chat-user", JSON.stringify(data));
//       setAuthUser(data);
//       toast.success("Login successful!");
//     } catch (error) {
//       toast.error(error.message || "An unexpected error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, login };
// };
// export default useLogin;

// function handleInputErrors(username, password) {
//   if (!username || !password) {
//     toast.error("Please fill in all fields");
//     return false;
//   }

//   return true;
// }
