import axios from "axios";
// import Cookies from 'js-cookie'
import { appConfig } from "~/configs";
import { FilterPostsOptions, PostInput, SearchPost, SortOptions } from "~/types";

axios.defaults.withCredentials = true;

// const { stripeClient } = stripeConfig;
const { SERVER_BASE_URL, PAGE_LIMIT } = appConfig;

export const getPosts = async function ({
  sort = "none",
  filter = "none",
  page = 1,
  search,
}: {
  sort?: SortOptions;
  filter?: FilterPostsOptions;
  page?: number;
  search?: SearchPost | URLSearchParams;
}) {
  try {
    let sortStr = "";
    let filterStr = "";
    if (sort === "latest") sortStr = "sort=-createdAt";
    if (sort === "oldest") sortStr = "sort=createdAt";
    if (sort === "shares-high") sortStr = "sort=-shares";
    if (sort === "shares-low") sortStr = "sort=shares";
    if (sort === "likes-high") sortStr = `sort=${JSON.stringify({ likes: -1 })}`;
    if (sort === "likes-low") sortStr = `sort=${JSON.stringify({ likes: 1 })}`;
    if (sort === "bookmarks-high") sortStr = `sort=${JSON.stringify({ bookmarks: -1 })}`;
    if (sort === "bookmarks-low") sortStr = `sort=${JSON.stringify({ bookmarks: 1 })}`;
    if (sort === "likes-high") sortStr = `sort=${JSON.stringify({ likes: -1 })}`;
    if (sort === "likes-low") sortStr = `sort=${JSON.stringify({ likes: 1 })}`;
    if (sort === "comments-high") sortStr = `sort=${JSON.stringify({ comments: -1 })}`;
    if (sort === "comments-low") sortStr = `sort=${JSON.stringify({ comments: 1 })}`;

    if (filter === "popular")
      filterStr = `&sort=${JSON.stringify({ likes: -1 })}&sort=${JSON.stringify({
        comments: -1,
      })}&sort=${JSON.stringify({ bookmarks: -1 })}`;
    if (filter === "trending") filterStr = `&sort=${JSON.stringify({ likes: -1, createdAt: -1 })}`;
    if (filter === "most-likes") filterStr = `&sort=${JSON.stringify({ likes: -1 })}`;

    const searchOptions = new URLSearchParams((search as URLSearchParams) || {})?.toString();

    let url = `${SERVER_BASE_URL}/api/v1/posts?${sortStr}${filterStr}&limit=${PAGE_LIMIT}&page=${page}`;
    if (searchOptions)
      url = `${SERVER_BASE_URL}/api/v1/posts?${sortStr}${filterStr}&limit=${PAGE_LIMIT}&page=${page}&${searchOptions}`;
    url = url.replace("?&", "?");

    // console.log(url)
    const res = await axios.get(url);

    // console.log(res)
    return { posts: res?.data?.data?.posts, count: res?.data?.count };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getPost = async function (id: string) {
  try {
    const res = await axios.get(`${SERVER_BASE_URL}/api/v1/posts/${id}`, {});

    // console.log(res);
    return res?.data?.data?.post;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updatePost = async function ({ id, data }: { id: string; data: FormData | Partial<PostInput> }) {
  try {
    // console.log("----------------------------");
    let query = axios.patch(`${SERVER_BASE_URL}/api/v1/posts/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        // "Content-Type": "application/json",
      },
    });

    if (!(data instanceof FormData))
      query = axios.patch(`${SERVER_BASE_URL}/api/v1/posts/${id}`, data, {
        headers: {
          // "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
        },
      });

    const res = await query;
    // console.log("--------------------------", res);
    return res?.data?.data?.post;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deletePost = async function ({ id }: { id: string }) {
  try {
    await axios.delete(`${SERVER_BASE_URL}/api/v1/posts/${id}`);
    // console.log(res)
    return null;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
