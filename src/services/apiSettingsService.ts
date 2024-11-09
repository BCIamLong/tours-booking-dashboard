import axios from "axios";
import { appConfig } from "~/configs";
import { SettingInput } from "~/types";

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

export const updateSetting = async function ({ data }: { data: Partial<SettingInput> }) {
  try {
    const res = await axios.patch(
      `${SERVER_BASE_URL}/api/v1/settings/setting-8981ba67-fee8-4dd6-9e5a-73780bee1d60`,
      data,
      {
        headers: {
          // "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(res)
    return res?.data?.data?.setting;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
