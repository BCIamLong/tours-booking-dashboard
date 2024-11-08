import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutService } from "~/services/apiAuthService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ErrorResponse } from "~/types";

export const useLogout = function () {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    isPending: isLoggingOut,
    error,
    mutate: logout,
  } = useMutation({
    mutationFn: logoutService,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.removeQueries();
      navigate("/login");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      toast.error(err?.response?.data?.message || err.message);
    },
  });

  return { isLoggingOut, logout, error };
};
