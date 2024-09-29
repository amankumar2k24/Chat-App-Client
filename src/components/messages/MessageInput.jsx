"use client";
import { sendUserConversation } from "@/lib/hooks/userHooks";
import useConversation from "@/zustand/useConversation";
import { useFormik } from "formik";
import { BsSend } from "react-icons/bs";
import { useMutation } from "react-query";

const MessageInput = () => {
  const { selectedConversation, messages, setMessages } = useConversation();
  // console.log("selectedConversation=>", selectedConversation);

  const onSuccess = (data) => {
    setMessages([...messages, data.result]);
    resetForm();
  };
  const onError = (error) => {
    console.log(error);
  };

  const { mutate: sendMessageToFrnd, isLoading } = useMutation(
    sendUserConversation,
    {
      onSuccess,
      onError,
    }
  );

  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: (values) => {
      sendMessageToFrnd({
        message: values.message, // Corrected to "message"
        id: selectedConversation._id,
      });
    },
  });

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          name="message"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={values.message}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {isLoading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
