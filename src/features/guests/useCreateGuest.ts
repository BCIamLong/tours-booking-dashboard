import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { createGuest } from "~/services/apiGuestsService";

import { ErrorResponse, GuestInput } from "~/types";

export default function useCreateGuest() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createGuestMutate } = useMutation({
    mutationFn: (newGuest: GuestInput) => createGuest({ data: newGuest }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
      // toast.success("Create new cabin successful");

      //   setTimeout(() => {
      //     setShowForm(false);
      //   }, 1000);
    },
    onError: (err: AxiosError<ErrorResponse>) => toast.error(err?.response?.data?.message || err.message),
  });

  return { isCreating, createGuestMutate };
}
