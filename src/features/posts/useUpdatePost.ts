import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updatePost } from "~/services/apiPostsService";
import { ErrorResponse } from "~/types";

export default function useUpdatePost() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updatePostMutate } = useMutation({
    mutationFn: ({ id, newPostData }: { id: string; newPostData: FormData }) => updatePost({ id, data: newPostData }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      toast.success("Update post successful");

      //   setTimeout(() => {
      //     setShowForm(false);
      //   }, 1000);
    },
    onError: (err: AxiosError<ErrorResponse>) => toast.error(err?.response?.data?.message || err.message),
  });

  return { isUpdating, updatePostMutate };
}
