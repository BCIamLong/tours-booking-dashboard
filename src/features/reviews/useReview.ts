import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getReview } from "~/services/apiReviewsService";

export const useReview = function () {
  const { id } = useParams();

  const {
    data: review,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["review", id],
    queryFn: () => getReview(id!),
  });

  return { review, isLoading, error };
};
