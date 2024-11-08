import { useQuery } from "@tanstack/react-query";
import { getUserSession } from "~/services/apiAuthService";

export const useUser = function () {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserSession,
  });
  console.log(user);
  return { user, isLoading, error, isAuthenticated: user?.role === "admin" };
};
