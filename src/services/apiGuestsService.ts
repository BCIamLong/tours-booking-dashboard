import axios from "axios";
import { appConfig } from "~/configs";
import { FilterGuestOptions, SearchGuest, SortOptions } from "~/types";

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
    if (sort === "price-high") sortStr = "sort=-totalPrice";
    if (sort === "price-low") sortStr = "sort=totalPrice";
    if (sort === "name-high") sortStr = "sort=-name";
    if (sort === "name-low") sortStr = "sort=name";

    // if (filter === "checked-in") filterStr = "&status=checked-in";
    // if (filter === "checked-out") filterStr = "&status=checked-out";
    // if (filter === "confirmed") filterStr = "&status=Confirmed";

    const searchOptions = new URLSearchParams((search as URLSearchParams) || {}).toString();

    let url = `${SERVER_BASE_URL}/api/v1/guests?${sortStr}${filterStr}&limit=${PAGE_LIMIT}&page=${page}`;
    if (searchOptions)
      url = `${SERVER_BASE_URL}/api/v1/guests?${sortStr}${filterStr}&limit=${PAGE_LIMIT}&page=${page}&${searchOptions}`;
    url = url.replace("?&", "?");

    // console.log(url)
    const res = await axios.get(url);

    // console.log(res)
    return { guests: res?.data?.data?.guests, count: res?.data?.count };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
