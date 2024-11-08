import axios from "axios";
import { appConfig } from "~/configs";
import { CheckPasswordInput, EditProfileInput, LoginInput, ResetPasswordInput, SignupInput } from "~/types";
const { SERVER_BASE_URL } = appConfig;
// const { ACCESS_TOKEN_EXPIRE } = cookieConfig

axios.defaults.withCredentials = true;

export const login = async function ({ email, password }: LoginInput) {
  try {
    const res = await axios.post(`${SERVER_BASE_URL}/api/v1/auth/login`, {
      email,
      password,
    });

    // Cookies.set('access-token', res.data.token, {
    //   expires: ACCESS_TOKEN_EXPIRE,
    //   sameSite: 'none',
    //   secure: env === 'production',
    // })

    if (res.data.verifyEmail === false) throw new Error(res.data.message);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const signup = async function (data: SignupInput) {
  try {
    const res = await axios.post(`${SERVER_BASE_URL}/api/v1/auth/signup`, data);

    // Cookies.set('access-token', res.data.token)

    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const logout = async function () {
  try {
    // const token = Cookies.get('access-token')
    // let options = {}
    // if (env === 'development')
    //   options = {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // if (env === 'production')
    const options = {
      // withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        // 'Access-Control-Allow-Origin': 'http://localhost:3009',
        // Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(`${SERVER_BASE_URL}/api/v1/auth/logout`, options);
    // console.log(res);

    // Cookies.remove('access-token')

    return res?.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserSession = async function () {
  try {
    // const token = Cookies.get('access-token')

    //  || Cookies.get("refresh-token");
    // ! so the client will not be able to access to the cookie is set from server because the security reason, so if our app really have SSL, https secure then we can do that we can send credential (cookies) along with request and the client also access to the cookie from server
    // * but to do that we need to able the SSL, https on both client and server, in development we can set the access cookie to long to develop our app
    // const token = document.cookie || Cookies.get("refresh-token");
    // console.log(token);
    const res = await axios.get(`${SERVER_BASE_URL}/api/v1/auth/session`, {
      // withCredentials: true,
      // withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    // console.log(res?.data?.session?.user);

    return res?.data?.session?.user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const editProfile = async function (data: EditProfileInput) {
  // const token = Cookies.get('access-token')
  const { name, avatar } = data;
  const requestBody = new FormData();
  requestBody.append("name", name);
  requestBody.append("fullName", name);

  if (avatar?.[0]) requestBody.append("avatar", avatar[0]);

  try {
    const res = await axios.patch(`${SERVER_BASE_URL}/api/v1/auth/me`, requestBody, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${token}`,
      },
    });

    // Cookies.set("access-token", res.data.token);

    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const checkPassword = async function (data: CheckPasswordInput) {
  // const token = Cookies.get('access-token')

  try {
    const res = await axios.post(`${SERVER_BASE_URL}/api/v1/auth/update-password/verify`, data, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    // Cookies.set("access-token", res.data.token);

    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const editPassword = async function (data: ResetPasswordInput, token: string) {
  try {
    // const accessToken = Cookies.get('access-token')

    const res = await axios.patch(`${SERVER_BASE_URL}/api/v1/auth/update-password/${token}`, data, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
      },
    });

    // Cookies.set('access-token', res.data.token, {
    //   expires: ACCESS_TOKEN_EXPIRE,
    // })

    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
