import axios from "axios";
// import Cookies from 'js-cookie'
import { appConfig } from "~/configs";
import { ReviewInput, FilterReviewsOptions, SearchReview, SortOptions } from "~/types";

axios.defaults.withCredentials = true;

// const { stripeClient } = stripeConfig;
const { SERVER_BASE_URL, PAGE_LIMIT } = appConfig;

export const getReviews = async function ({
  sort = "none",
  filter = "none",
  page = 1,
  search,
}: {
  sort?: SortOptions;
  filter?: FilterReviewsOptions;
  page?: number;
  search?: SearchReview | URLSearchParams;
}) {
  try {
    let sortStr = "";
    let filterStr = "";
    if (sort === "latest") sortStr = "sort=-createdAt";
    if (sort === "oldest") sortStr = "sort=createdAt";
    if (sort === "rating-high") sortStr = "sort=-rating";
    if (sort === "rating-low") sortStr = "sort=rating";

    if (filter === "1") filterStr = "&rating=1";
    if (filter === "2") filterStr = "&rating=2";
    if (filter === "3") filterStr = "&rating=3";
    if (filter === "4") filterStr = "&rating=4";
    if (filter === "5") filterStr = "&rating=5";

    const searchOptions = new URLSearchParams((search as URLSearchParams) || {})?.toString();

    let url = `${SERVER_BASE_URL}/api/v1/reviews?${sortStr}${filterStr}&limit=${PAGE_LIMIT}&page=${page}`;
    if (searchOptions)
      url = `${SERVER_BASE_URL}/api/v1/reviews?${sortStr}${filterStr}&limit=${PAGE_LIMIT}&page=${page}&${searchOptions}`;
    url = url.replace("?&", "?");

    // console.log(url)
    const res = await axios.get(url);

    // console.log(res)
    return { reviews: res?.data?.data?.reviews, count: res?.data?.count };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getReview = async function (id: string) {
  try {
    const res = await axios.get(`${SERVER_BASE_URL}/api/v1/reviews/${id}`, {});

    // console.log(res);
    return res?.data?.data?.review;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateReview = async function ({ id, data }: { id: string; data: Partial<ReviewInput> }) {
  try {
    console.log("----------------------------");
    const res = await axios.patch(`${SERVER_BASE_URL}/api/v1/reviews/${id}`, data, {
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
      },
    });
    console.log("--------------------------", res);
    return res?.data?.data?.review;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteReview = async function ({ id }: { id: string }) {
  try {
    await axios.delete(`${SERVER_BASE_URL}/api/v1/reviews/${id}`);
    // console.log(res)
    return null;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
