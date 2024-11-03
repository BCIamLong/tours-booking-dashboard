import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateTour } from "~/services/apiToursService";
import { ErrorResponse } from "~/types";

export default function useUpdateTour() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateTourMutate } = useMutation({
    mutationFn: ({ id, newTourData }: { id: string; newTourData: FormData }) => updateTour({ id, data: newTourData }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tours"],
      });
      toast.success("Update tour successful");

      //   setTimeout(() => {
      //     setShowForm(false);
      //   }, 1000);
    },
    onError: (err: AxiosError<ErrorResponse>) => toast.error(err?.response?.data?.message || err.message),
  });

  return { isUpdating, updateTourMutate };
}
