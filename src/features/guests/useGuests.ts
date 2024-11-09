import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { FilterGuestOptions, SortOptions } from "~/types";
import { appConfig } from "~/configs";
import { getGuests } from "~/services/apiGuestsService";

const { PAGE_LIMIT } = appConfig;

export const useGuests = function ({
  sort = "none",
  filter = "none",
  page = 1,
  limit,
}: {
  sort: SortOptions;
  filter: FilterGuestOptions;
  page?: number;
  limit?: number;
}) {
  const [searchParams] = useSearchParams();
  const search = JSON.parse(searchParams.get("search") || `{}`);
  const currentPage = +searchParams.get("page")! || 1;

  const queryClient = useQueryClient();
  const options = { sort, filter, page: currentPage || page, limit, search };
  const { data, isLoading, error } = useQuery({
    // queryKey: [`tours${sort !== "none" ? `-sort-by-${sort}` : ""}`],
    queryKey: [`guests`, options],
    queryFn: () => getGuests(options),
  });
  const { guests, count } = data || {};
  // console.log(count);

  const numPages = Math.ceil(count / PAGE_LIMIT);
  if (page > 1 && page <= numPages) {
    const prefetchOptions = { ...options, page: page - 1 };
    queryClient.prefetchQuery({
      queryKey: [`guests`, prefetchOptions],
      queryFn: () => getGuests(prefetchOptions),
    });
  }

  if (page >= 1 && page < numPages) {
    const prefetchOptions = { ...options, page: page + 1 };
    queryClient.prefetchQuery({
      queryKey: [`guests`, prefetchOptions],
      queryFn: () => getGuests(prefetchOptions),
    });
  }

  return { guests, isLoading, count, search, error };
};
