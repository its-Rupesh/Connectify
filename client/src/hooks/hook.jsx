import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else toast.error(error?.data?.message || "Something Went Wrong");
      }
    });
  }, [errors]);
};
const useAsyncFuncn = (mutationHook) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState(null);
  const [mutate] = mutationHook();
  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || "Updating Data");
    try {
      const res = await mutate(...args);
      if (res.data) {
        toast.success(res.data.message || "Updating Data", { id: toastId });
        setdata(res.data);
      } else {
        toast.error(res?.error?.data?.message || "Something Went Wrong", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong !!", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };
  return [executeMutation, isLoading, data];
};
const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });
    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, handlers]);
};
export { useErrors, useAsyncFuncn, useSocketEvents };
