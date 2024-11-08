import axios from "axios";
// import Cookies from 'js-cookie'
import { appConfig } from "~/configs";
import { SearchBooking, SortOptions, UserBookingsOption } from "~/types";

axios.defaults.withCredentials = true;

// const { stripeClient } = stripeConfig;
const { SERVER_BASE_URL, PAGE_LIMIT } = appConfig;

export const getBookings = async function ({
  sort = "none",
  page = 1,
  search,
}: {
  sort?: SortOptions;
  page?: number;
  search?: SearchBooking | URLSearchParams;
}) {
  try {
    let sortStr = "";

    if (sort === "latest") sortStr = "sort=-createdAt";
    if (sort === "oldest") sortStr = "sort=createdAt";
    if (sort === "price-high") sortStr = "sort=-regularPrice";
    if (sort === "price-low") sortStr = "sort=regularPrice";
    if (sort === "name-high") sortStr = "sort=-name";
    if (sort === "name-low") sortStr = "sort=name";

    const searchOptions = new URLSearchParams((search as URLSearchParams) || {}).toString();

    let url = `${SERVER_BASE_URL}/api/v1/bookings?${sortStr}&limit=${PAGE_LIMIT}&page=${page}`;
    if (searchOptions)
      url = `${SERVER_BASE_URL}/api/v1/bookings?${sortStr}&limit=${PAGE_LIMIT}&page=${page}&${searchOptions}`;
    url = url.replace("?&", "?");

    // console.log(url)
    const res = await axios.get(url);

    // console.log(res)
    return { bookings: res?.data?.data?.bookings, count: res?.data?.count };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserBookings = async function ({
  cabinId,
  options = {},
}: {
  cabinId?: string;
  options?: UserBookingsOption;
}) {
  // const token = Cookies.get('access-token')
  let url = `${SERVER_BASE_URL}/api/v1/bookings/me`;
  if (cabinId) {
    if (cabinId.includes("cabin")) url = `${SERVER_BASE_URL}/api/v1/cabins/${cabinId}/bookings/me`;

    url = `${SERVER_BASE_URL}/api/v1/tours/${cabinId}/bookings/me`;
  }
  const { status, cabin } = options;

  if (status && typeof status === "string") url = `${SERVER_BASE_URL}/api/v1/auth/me/bookings?status=${status}`;
  if (status && typeof status === "object" && !cabin)
    url = `${SERVER_BASE_URL}/api/v1/auth/me/bookings?status[${status.operation}]=${status.value}`;
  // console.log(url)
  if (status && typeof status === "object" && cabin) {
    if (cabinId?.includes("cabin"))
      url = `${SERVER_BASE_URL}/api/v1/auth/me/bookings?status[${status.operation}]=${status.value}&&cabinId=${cabinId}`;

    url = `${SERVER_BASE_URL}/api/v1/auth/me/bookings?status[${status.operation}]=${status.value}&&tourId=${cabinId}`;
  }
  try {
    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res)

    return res?.data?.bookings || res?.data?.data?.bookings || null;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserBooking = async function () {
  // const token = Cookies.get('access-token')

  try {
    const res = await axios.get(`${SERVER_BASE_URL}/api/v1/bookings/me/latest`, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res);

    return res?.data?.booking;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteUserBooking = async function (id: string) {
  // const token = Cookies.get('access-token')

  try {
    const res = await axios.delete(`${SERVER_BASE_URL}/api/v1/bookings/${id}/me/`, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res)

    return res?.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
