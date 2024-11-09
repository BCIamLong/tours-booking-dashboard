import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateGuest } from "~/services/apiGuestsService";
import { ErrorResponse } from "~/types";

export default function useUpdateGuest() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateGuestMutate } = useMutation({
    mutationFn: ({ id, newGuestData }: { id: string; newGuestData: FormData }) =>
      updateGuest({ id, data: newGuestData }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
      toast.success("Update guest successful");

      //   setTimeout(() => {
      //     setShowForm(false);
      //   }, 1000);
    },
    onError: (err: AxiosError<ErrorResponse>) => toast.error(err?.response?.data?.message || err.message),
  });

  return { isUpdating, updateGuestMutate };
}
