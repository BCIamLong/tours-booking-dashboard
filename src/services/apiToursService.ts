import axios from "axios";
import { appConfig } from "~/configs";
import { FilterOptions, SearchTour, SortOptions } from "~/types";

// ! REMEMBER WHEN WE USE      "Content-Type": "multipart/form-data", WE NEED SOMETHING IN THE BACKEND TO TAKE THE DATA FROM THIS FORM DATA, BY DEFAULT SOME BACKEND FRAMEWORK MIGHT NOT HANDLE THIS DATA SO IF THAT'S A CASE WE NEED TO USE SOMETHING LIKE MULTER LIBRARY TO RESOLVE THIS DATA AND ATTACH IT TO REQUEST BODY, FILES, FILE....
// ! "Content-Type": "multipart/form-data" REMEMBER THAT WHEN WE USE WE NEED TO USE SOMETHING TO RESOLVE THE FORM DATA

axios.defaults.withCredentials = true;
const { SERVER_BASE_URL, PAGE_LIMIT } = appConfig;

const getTours = async function ({
  sort = "none",
  filter = "none",
  page = 1,
  limit = PAGE_LIMIT,
  search,
  type = "none",
  status = "none",
  date = "none",
  difficulty = "none",
}: {
  sort?: SortOptions;
  filter?: FilterOptions;
  page?: number;
  limit?: number;
  search?: SearchTour | URLSearchParams;
  type?: string;
  status?: string;
  date?: string;
  difficulty?: string;
}) {
  try {
    let sortStr = "";
    let filterStr = "";
    const typeStr = type === "none" ? "" : `&type=${type}`;
    if (type && (search as SearchTour)?.type) delete (search as SearchTour)["type"];

    const difficultyStr = difficulty === "none" ? "" : `&difficulty=${difficulty}`;
    const dateStr = date === "none" ? "" : `&date=${date}`;
    let statusStr = "";

    if (sort === "latest") sortStr = "sort=-createdAt";
    if (sort === "oldest") sortStr = "sort=createdAt";
    if (sort === "price-high") sortStr = "sort=-price";
    if (sort === "price-low") sortStr = "sort=price";
    if (sort === "name-high") sortStr = "sort=-name";
    if (sort === "name-low") sortStr = "sort=name";
    // if (sort === 'none') sortStr = ''

    if (filter === "group") filterStr = "&type=group";
    if (filter === "private") filterStr = "&type=private";
    if (filter === "personal") filterStr = "&type=personal";

    if (status === "popular") statusStr = "&sort=-ratingsQuantity";
    if (status === "trending") statusStr = "&sort=-ratingsQuantity&sort=-ratingsAverage";
    if (status === "most-discount") statusStr = "&sort=-ratingsQuantity";

    console.log(search);
    const searchOptions = new URLSearchParams((search as URLSearchParams) || {})?.toString();
    console.log(searchOptions);

    let url = `${SERVER_BASE_URL}/api/v1/tours?${sortStr}${filterStr}${typeStr}${difficultyStr}${statusStr}${dateStr}&limit=${limit}&page=${page}`;
    if (searchOptions)
      url = `${SERVER_BASE_URL}/api/v1/tours?${sortStr}${filterStr}${typeStr}${difficultyStr}${statusStr}${dateStr}&limit=${limit}&page=${page}&${searchOptions}`;
    url = url.replace("?&", "?");
    console.log(statusStr);
    console.log(url);

    // console.log(url)
    const res = await axios.get(url);

    // console.log(res)
    return { tours: res?.data?.data?.tours, count: res?.data?.count };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getTour = async function (id: string) {
  try {
    const res = await axios.get(`${SERVER_BASE_URL}/api/v1/tours/${id}`, {});

    console.log(res);
    return res?.data?.data?.tour;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getToursAvailableToPost = async function () {
  try {
    // 1 fetch the bookings from the user
    // 2 attach the tour id from all bookings to tourId array
    // 3
    const res = await axios.get(`${SERVER_BASE_URL}/api/v1/tours/tours-to-post`);

    return res.data.data.tours;
  } catch (err) {
    console.log(err);
  }
};

const createTour = async function ({ data }: { data: FormData }) {
  try {
    const res = await axios.post(`${SERVER_BASE_URL}/api/v1/tours`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(res)
    return res?.data?.data?.tour;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateTour = async function ({ id, data }: { id: string; data: FormData }) {
  try {
    console.log("----------------------------", data.get("type"));
    const res = await axios.patch(`${SERVER_BASE_URL}/api/v1/tours/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        // 'Content-Type': 'application/json',
      },
    });
    // console.log(res)
    return res?.data?.data?.tour;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteTour = async function ({ id }: { id: string }) {
  try {
    await axios.delete(`${SERVER_BASE_URL}/api/v1/tours/${id}`);
    // console.log(res)
    return null;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { getTours, getTour, getToursAvailableToPost, createTour, deleteTour, updateTour };
