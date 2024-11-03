import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { createTour } from "~/services/apiToursService";
import { ErrorResponse } from "~/types";

export default function useCreateTour() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createTourMutate } = useMutation({
    mutationFn: (newTour: FormData) => createTour({ data: newTour }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tours"],
      });
      // toast.success("Create new cabin successful");

      //   setTimeout(() => {
      //     setShowForm(false);
      //   }, 1000);
    },
    onError: (err: AxiosError<ErrorResponse>) => toast.error(err?.response?.data?.message || err.message),
  });

  return { isCreating, createTourMutate };
}
