import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { deleteReview } from "~/services/apiReviewsService";
import { ErrorResponse } from "~/types";

export default function useDeleteReview() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteReviewMutate } = useMutation({
    mutationFn: (id: string) => deleteReview({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      // setIsSelected(false);
      toast.success("Delete review successfully");
    },
    onError: (err: AxiosError<ErrorResponse>) => toast.error(err?.response?.data?.message || err.message),
    // onError: (err) =>
    //   toast.custom(
    //     <div>
    //       {err.message} <button onClick={endPause}>Close</button>
    //     </div>
    //   ),
  });

  return { isDeleting, deleteReviewMutate };
}
