import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { signup as signupService } from "~/services/apiAuthService";
import { ErrorResponse, SignupInput } from "~/types";

export const useSignup = function () {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isPending: isSigning,
    error,
    mutate: signup,
  } = useMutation({
    mutationFn: (data: SignupInput) => signupService(data),
    onSuccess: () => {
      toast.success(
        "Your new account is successfully sign up, please check your mail and verify your email to using our web app"
      );
      navigate("/login", { replace: true });
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      toast.error(err?.response?.data?.message || err.message);
    },
  });

  return { isSigning, signup, error };
};
