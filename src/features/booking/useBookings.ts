import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { FilterOptions, SortOptions } from "~/types";
import { appConfig } from "~/configs";
import { getBookings } from "~/services/apiBookingService";

const { PAGE_LIMIT } = appConfig;

export const useBookings = function ({
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

  const queryClient = useQueryClient();
  const options = { sort, filter, page, limit, search, status, type, date, difficulty };
  const { data, isLoading, error } = useQuery({
    // queryKey: [`tours${sort !== "none" ? `-sort-by-${sort}` : ""}`],
    queryKey: [`bookings`, options],
    queryFn: () => getBookings(options),
  });
  const { bookings, count } = data || {};

  const numPages = Math.ceil(count / PAGE_LIMIT);
  if (page > 1 && page <= numPages) {
    const prefetchOptions = { ...options, page: page - 1 };
    queryClient.prefetchQuery({
      queryKey: [`bookings`, prefetchOptions],
      queryFn: () => getBookings(prefetchOptions),
    });
  }

  if (page >= 1 && page < numPages) {
    const prefetchOptions = { ...options, page: page + 1 };
    queryClient.prefetchQuery({
      queryKey: [`bookings`, prefetchOptions],
      queryFn: () => getBookings(prefetchOptions),
    });
  }

  return { bookings, isLoading, count, search, error };
};
