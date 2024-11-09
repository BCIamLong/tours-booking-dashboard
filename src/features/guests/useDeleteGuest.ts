import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { deleteGuest } from "~/services/apiGuestsService";
import { ErrorResponse } from "~/types";

export default function useDeleteGuest() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteGuestMutate } = useMutation({
    mutationFn: (id: string) => deleteGuest({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
      // setIsSelected(false);
      toast.success("Delete guest successfully");
    },
    onError: (err: AxiosError<ErrorResponse>) => toast.error(err?.response?.data?.message || err.message),
    // onError: (err) =>
    //   toast.custom(
    //     <div>
    //       {err.message} <button onClick={endPause}>Close</button>
    //     </div>
    //   ),
  });

  return { isDeleting, deleteGuestMutate };
}
