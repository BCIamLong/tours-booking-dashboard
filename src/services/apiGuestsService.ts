import axios from "axios";
import { appConfig } from "~/configs";
import { FilterGuestOptions, GuestInput, SearchGuest, SortOptions } from "~/types";

axios.defaults.withCredentials = true;
const { SERVER_BASE_URL, PAGE_LIMIT } = appConfig;

export const getGuests = async function ({
  sort = "none",
  filter = "none",
  page = 1,
  search,
}: {
  sort?: SortOptions;
  filter?: FilterGuestOptions;
  page?: number;
  search?: SearchGuest | URLSearchParams;
}) {
  try {
    let sortStr = "";
    let filterStr = "";
    if (sort === "latest") sortStr = "sort=-createdAt";
    if (sort === "oldest") sortStr = "sort=createdAt";
    // if (sort === "price-high") sortStr = "sort=-totalPrice";
    // if (sort === "price-low") sortStr = "sort=totalPrice";
    if (sort === "name-high") sortStr = "sort=-fullName";
    if (sort === "name-low") sortStr = "sort=fullName";

    if (filter === "verifyEmail-false") filterStr = "&verifyEmail=false";
    if (filter === "verifyEmail-true") filterStr = "&verifyEmail=true";
    if (filter === "enable2FA-false") filterStr = "&enable2FA=false";
    if (filter === "enable2FA-true") filterStr = "&enable2FA=true";

    const searchOptions = new URLSearchParams((search as URLSearchParams) || {})?.toString();

    let url = `${SERVER_BASE_URL}/api/v1/guests?${sortStr}${filterStr}&limit=${PAGE_LIMIT}&page=${page}`;
    if (searchOptions)
      url = `${SERVER_BASE_URL}/api/v1/guests?${sortStr}${filterStr}&limit=${PAGE_LIMIT}&page=${page}&${searchOptions}`;
    url = url.replace("?&", "?");

    // console.log(url)
    const res = await axios.get(url);

    // console.log(res);
    return { guests: res?.data?.data?.guests, count: res?.data?.count };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getGuest = async function (id: string) {
  try {
    const res = await axios.get(`${SERVER_BASE_URL}/api/v1/guests/${id}`, {});

    // console.log(res);
    return res?.data?.data?.guest;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createGuest = async function ({ data }: { data: GuestInput }) {
  try {
    const res = await axios.post(`${SERVER_BASE_URL}/api/v1/guests`, data, {
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
      },
    });
    // console.log(res)
    return res?.data?.data?.guest;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateGuest = async function ({ id, data }: { id: string; data: FormData }) {
  try {
    // console.log("----------------------------", data.get("type"));
    const res = await axios.patch(`${SERVER_BASE_URL}/api/v1/guests/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        // 'Content-Type': 'application/json',
      },
    });
    // console.log(res)
    return res?.data?.data?.guest;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteGuest = async function ({ id }: { id: string }) {
  try {
    await axios.delete(`${SERVER_BASE_URL}/api/v1/guests/${id}`);
    // console.log(res)
    return null;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
