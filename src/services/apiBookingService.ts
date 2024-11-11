import axios from "axios";
import { endOfDay, startOfDay } from "date-fns";
// import Cookies from 'js-cookie'
import { appConfig } from "~/configs";
import { BookingInput, FilterBookingsOptions, SearchBooking, SortOptions, UserBookingsOption } from "~/types";

axios.defaults.withCredentials = true;

// const { stripeClient } = stripeConfig;
const { SERVER_BASE_URL, PAGE_LIMIT } = appConfig;

export const getBookings = async function ({
  sort = "none",
  filter = "none",
  page = 1,
  search,
}: {
  sort?: SortOptions;
  filter?: FilterBookingsOptions;
  page?: number;
  search?: SearchBooking | URLSearchParams;
}) {
  try {
    let sortStr = "";
    let filterStr = "";
    if (sort === "latest") sortStr = "sort=-createdAt";
    if (sort === "oldest") sortStr = "sort=createdAt";
    if (sort === "price-high") sortStr = "sort=-totalPrice";
    if (sort === "price-low") sortStr = "sort=totalPrice";
    if (sort === "name-high") sortStr = "sort=-name";
    if (sort === "name-low") sortStr = "sort=name";

    if (filter === "checked-in") filterStr = "&status=checked-in";
    if (filter === "checked-out") filterStr = "&status=checked-out";
    if (filter === "confirmed") filterStr = "&status=Confirmed";

    const searchOptions = new URLSearchParams((search as URLSearchParams) || {}).toString();

    let url = `${SERVER_BASE_URL}/api/v1/bookings?${sortStr}${filterStr}&limit=${PAGE_LIMIT}&page=${page}`;
    if (searchOptions)
      url = `${SERVER_BASE_URL}/api/v1/bookings?${sortStr}${filterStr}&limit=${PAGE_LIMIT}&page=${page}&${searchOptions}`;
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

export const getBooking = async function (id: string) {
  try {
    const res = await axios.get(`${SERVER_BASE_URL}/api/v1/bookings/${id}`, {});

    // console.log(res);
    return res?.data?.data?.booking;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateBooking = async function ({ id, data }: { id: string; data: Partial<BookingInput> }) {
  try {
    console.log("----------------------------");
    const res = await axios.patch(`${SERVER_BASE_URL}/api/v1/bookings/${id}`, data, {
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
      },
    });
    console.log("--------------------------", res);
    return res?.data?.data?.booking;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteBooking = async function ({ id }: { id: string }) {
  try {
    await axios.delete(`${SERVER_BASE_URL}/api/v1/bookings/${id}`);
    // console.log(res)
    return null;
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

export const getBookingsAfterDate = async function (date: Date) {
  try {
    const startDateStr = startOfDay(date).toISOString();
    const endDateStr = endOfDay(new Date()).toISOString();

    const res = await axios.get(
      `${SERVER_BASE_URL}/api/v1/bookings?createdAt[gte]=${startDateStr}&createdAt[lte]=${endDateStr}`
    );
    console.log(res);
    return res?.data?.data?.bookings;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getStaysAfterDate = async function (date: Date) {
  try {
    const startDateStr = startOfDay(date).toISOString();
    const endDateStr = endOfDay(new Date()).toISOString();

    const res = await axios.get(
      `${SERVER_BASE_URL}/api/v1/bookings?startDate[gte]=${startDateStr}&startDate[lte]=${endDateStr}`
    );
    console.log(res);
    return res?.data?.data?.bookings;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getActivitiesToday = async function () {
  try {
    const startDateStr = new Date().toISOString();
    const endDateStr = endOfDay(new Date()).toISOString();

    const res1 = await axios.get(
      `${SERVER_BASE_URL}/api/v1/bookings?startDate[gte]=${startDateStr}&startDate[lte]=${endDateStr}&status[eq]=confirmed`
    );

    const res2 = await axios.get(
      `${SERVER_BASE_URL}/api/v1/bookings?endDate[gte]=${startDateStr}&endDate[lte]=${endDateStr}&status[eq]=checked-in`
    );

    return [...(res1?.data?.data?.bookings || []), ...(res2?.data?.data?.bookings || [])];
  } catch (err) {
    console.log(err);
    throw err;
  }
};
