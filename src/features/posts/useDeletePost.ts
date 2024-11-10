import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { deletePost } from "~/services/apiPostsService";
import { ErrorResponse } from "~/types";

export default function useDeletePost() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deletePostMutate } = useMutation({
    mutationFn: (id: string) => deletePost({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      // setIsSelected(false);
      toast.success("Delete post successfully");
    },
    onError: (err: AxiosError<ErrorResponse>) => toast.error(err?.response?.data?.message || err.message),
    // onError: (err) =>
    //   toast.custom(
    //     <div>
    //       {err.message} <button onClick={endPause}>Close</button>
    //     </div>
    //   ),
  });

  return { isDeleting, deletePostMutate };
}
