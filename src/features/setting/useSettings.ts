import { useQuery } from "@tanstack/react-query";
import { getSettings } from "~/services/apiSettingsService";

export default function useSettings() {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, settings, error };
}
