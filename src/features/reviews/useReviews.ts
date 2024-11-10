import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { FilterReviewsOptions, SortOptions } from "~/types";
import { appConfig } from "~/configs";
import { getReviews } from "~/services/apiReviewsService";

const { PAGE_LIMIT } = appConfig;

export const useReviews = function ({
  sort = "none",
  filter = "none",
  page = 1,
  limit,
}: {
  sort: SortOptions;
  filter: FilterReviewsOptions;
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  date?: string;
  difficulty?: string;
}) {
  const [searchParams] = useSearchParams();
  const search = JSON.parse(searchParams.get("search") || `{}`);
  const currentPage = +searchParams.get("page")! || 1;

  const queryClient = useQueryClient();
  const options = { sort, filter, page: currentPage || page, limit, search, status };
  const { data, isLoading, error } = useQuery({
    // queryKey: [`reviews${sort !== "none" ? `-sort-by-${sort}` : ""}`],
    queryKey: [`reviews`, options],
    queryFn: () => getReviews(options),
  });
  const { reviews, count } = data || {};

  const numPages = Math.ceil(count / PAGE_LIMIT);
  if (page > 1 && page <= numPages) {
    const prefetchOptions = { ...options, page: page - 1 };
    queryClient.prefetchQuery({
      queryKey: [`reviews`, prefetchOptions],
      queryFn: () => getReviews(prefetchOptions),
    });
  }

  if (page >= 1 && page < numPages) {
    const prefetchOptions = { ...options, page: page + 1 };
    queryClient.prefetchQuery({
      queryKey: [`reviews`, prefetchOptions],
      queryFn: () => getReviews(prefetchOptions),
    });
  }

  return { reviews, isLoading, count, search, error };
};
