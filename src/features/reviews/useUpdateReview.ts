import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateReview } from "~/services/apiReviewsService";
import { ErrorResponse, ReviewInput } from "~/types";

export default function useUpdateReview() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateReviewMutate } = useMutation({
    mutationFn: ({ id, newReviewData }: { id: string; newReviewData: Partial<ReviewInput> }) =>
      updateReview({ id, data: newReviewData }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      toast.success("Update review successful");

      //   setTimeout(() => {
      //     setShowForm(false);
      //   }, 1000);
    },
    onError: (err: AxiosError<ErrorResponse>) => toast.error(err?.response?.data?.message || err.message),
  });

  return { isUpdating, updateReviewMutate };
}
