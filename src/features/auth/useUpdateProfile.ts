import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProfile as editProfileService } from "~/services/apiAuthService";

import { EditProfileInput, ErrorResponse } from "~/types";
// import { useNavigate } from "react-router-dom";

export const useUpdateProfile = function () {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    isPending: isUpdating,
    error,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: (data: EditProfileInput) => editProfileService(data),
    onSuccess: () => {
      toast.success("Edit your info successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      toast.error(err?.response?.data?.message || err.message);
    },
  });

  return { isUpdating, error, updateProfile };
};
