import axios from "axios";
import { appConfig } from "~/configs";

axios.defaults.withCredentials = true;
const { SERVER_BASE_URL } = appConfig;

export const getSettings = async function () {
  try {
    const res = await axios.get(`${SERVER_BASE_URL}/api/v1/settings`);

    // console.log(res);
    return res?.data?.data?.settings;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
