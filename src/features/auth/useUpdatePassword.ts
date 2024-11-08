import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EditPasswordInput, ErrorResponse } from "~/types";
import { editPassword as editPasswordService } from "~/services/apiAuthService";

export const useUpdatePassword = function () {
  const queryClient = useQueryClient();
  const {
    isPending: isUpdating,
    error,
    mutate: updatePassword,
  } = useMutation({
    mutationFn: ({ data, token }: { data: EditPasswordInput; token: string }) => editPasswordService(data, token),
    onSuccess: () => {
      // console.log(data);
      toast.success("Your password is edit successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      toast.error(err?.response?.data?.message || err.message);
    },
  });

  return { isUpdating, error, updatePassword };
};
