import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { deleteTour } from "~/services/apiToursService";
import { ErrorResponse } from "~/types";

export default function useDeleteTour() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteTourMutate } = useMutation({
    mutationFn: (id: string) => deleteTour({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tours"],
      });
      // setIsSelected(false);
      toast.success("Delete tour successfully");
    },
    onError: (err: AxiosError<ErrorResponse>) => toast.error(err?.response?.data?.message || err.message),
    // onError: (err) =>
    //   toast.custom(
    //     <div>
    //       {err.message} <button onClick={endPause}>Close</button>
    //     </div>
    //   ),
  });

  return { isDeleting, deleteTourMutate };
}
