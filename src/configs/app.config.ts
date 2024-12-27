export default {
  SERVER_BASE_URL:
    // 'https://booking-api-ebe1.onrender.com',
    import.meta.env.MODE === "production"
      ? // ? 'https://booking-api-ebe1.onrender.com'
        "https://tours-booking-api.onrender.com"
      : // : "https://tours-booking-api.onrender.com",
        // "https://tours-booking-api.onrender.com",
        "http://localhost:3009",
  CLIENT_BASE_UTL: import.meta.env.MODE === "production" ? "" : "http://localhost:5173",
  PAGE_LIMIT: 6,
};
