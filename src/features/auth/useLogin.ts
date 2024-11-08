import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { ErrorResponse, LoginInput } from "~/types";
import { login as loginService } from "~/services/apiAuthService";

export const useLogin = function () {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const {
    isPending: isLogging,
    error,
    mutate: login,
  } = useMutation({
    mutationFn: ({ email, password }: LoginInput) => loginService({ email, password }),
    onSuccess: (data) => {
      // console.log(data);
      // queryClient.setQueryData(["isVerify2FA"], data.enable2FA || false);

      toast.success("Login successfully");
      // queryClient.setQueryData(["user"], userData);
      navigate("/dashboard", { replace: true });
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      toast.error(err?.response?.data?.message || err.message);
    },
  });

  return { isLogging, login, error };
};
