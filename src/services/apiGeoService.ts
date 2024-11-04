import { BASE_GEO_URL } from "~/configs";

export const getDataGeolocation = async (lat: string, lng: string) => {
  try {
    const res = await fetch(`${BASE_GEO_URL}?latitude=${lat}&longitude=${lng}`);
    const data = await res.json();
    // console.log(data);
    console.log(data);
    return {
      name: data.city || data.locality || "",
      locality: data.locality,
      country: data.countryName,
      position: {
        lat: data.latitude,
        lng: data.longitude,
      },
      countryCode: data.countryCode,
    };
  } catch (err) {
    throw new Error("Get city geolocation error!");
  }
};
