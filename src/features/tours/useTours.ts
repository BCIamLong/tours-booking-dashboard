import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { FilterOptions, SortOptions } from "~/types";
import { appConfig } from "~/configs";
import { getTours } from "~/services/apiToursService";

const { PAGE_LIMIT } = appConfig;

export const useTours = function ({
  sort = "none",
  filter = "none",
  page = 1,
  limit,
  type,
  status,
  date,
  difficulty,
}: {
  sort: SortOptions;
  filter: FilterOptions;
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
  const options = { sort, filter, page: currentPage || page, limit, search, status, type, date, difficulty };
  const { data, isLoading, error } = useQuery({
    // queryKey: [`tours${sort !== "none" ? `-sort-by-${sort}` : ""}`],
    queryKey: [`tours`, options],
    queryFn: () => getTours(options),
  });
  const { tours, count } = data || {};

  const numPages = Math.ceil(count / PAGE_LIMIT);
  if (page > 1 && page <= numPages) {
    const prefetchOptions = { ...options, page: page - 1 };
    queryClient.prefetchQuery({
      queryKey: [`tours`, prefetchOptions],
      queryFn: () => getTours(prefetchOptions),
    });
  }

  if (page >= 1 && page < numPages) {
    const prefetchOptions = { ...options, page: page + 1 };
    queryClient.prefetchQuery({
      queryKey: [`tours`, prefetchOptions],
      queryFn: () => getTours(prefetchOptions),
    });
  }

  return { tours, isLoading, count, search, error };
};
