import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { FilterPostsOptions, SortOptions } from "~/types";
import { appConfig } from "~/configs";
import { getPosts } from "~/services/apiPostsService";

const { PAGE_LIMIT } = appConfig;

export const usePosts = function ({
  sort = "none",
  filter = "none",
  page = 1,
  limit,
}: {
  sort: SortOptions;
  filter: FilterPostsOptions;
  page?: number;
  limit?: number;
}) {
  const [searchParams] = useSearchParams();
  const search = JSON.parse(searchParams.get("search") || `{}`);
  const currentPage = +searchParams.get("page")! || 1;

  const queryClient = useQueryClient();
  const options = { sort, filter, page: currentPage || page, limit, search };
  const { data, isLoading, error } = useQuery({
    // queryKey: [`posts${sort !== "none" ? `-sort-by-${sort}` : ""}`],
    queryKey: [`posts`, options],
    queryFn: () => getPosts(options),
  });
  const { posts, count } = data || {};

  const numPages = Math.ceil(count / PAGE_LIMIT);
  if (page > 1 && page <= numPages) {
    const prefetchOptions = { ...options, page: page - 1 };
    queryClient.prefetchQuery({
      queryKey: [`posts`, prefetchOptions],
      queryFn: () => getPosts(prefetchOptions),
    });
  }

  if (page >= 1 && page < numPages) {
    const prefetchOptions = { ...options, page: page + 1 };
    queryClient.prefetchQuery({
      queryKey: [`posts`, prefetchOptions],
      queryFn: () => getPosts(prefetchOptions),
    });
  }

  return { posts, isLoading, count, search, error };
};
