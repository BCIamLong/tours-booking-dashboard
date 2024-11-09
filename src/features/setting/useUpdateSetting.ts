import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateSetting as updateSettingService } from "~/services/apiSettingsService";
import { ErrorResponse } from "~/types";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateSettingMutate } = useMutation({
    // mutationFn: (newSetting: Setting) => patchSetting(newSetting),
    mutationFn: updateSettingService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("The setting is updated successfully");

      //   setTimeout(() => {
      //     setShowForm(false);
      //   }, 1000);
    },
    onError: (err: AxiosError<ErrorResponse>) => toast.error(err?.response?.data?.message || err.message),
  });

  return { isUpdating, updateSettingMutate };
}
