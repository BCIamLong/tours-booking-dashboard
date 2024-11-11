import { useQuery } from "@tanstack/react-query";
import { getActivitiesToday } from "~/services/apiBookingService";

export const useTodayActivities = function () {
  const {
    data: activities,
    isLoading,
    error,
  } = useQuery({
    queryFn: getActivitiesToday,
    queryKey: ["today_activities"],
  });

  return { isLoading, error, activities };
};
