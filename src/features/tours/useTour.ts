import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTour } from "~/services/apiToursService";

export const useTour = function () {
  const { id } = useParams();

  const {
    data: tour,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => getTour(id!),
  });

  return { tour, isLoading, error };
};
