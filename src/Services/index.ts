import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:33033/api",
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
http.interceptors.response.use(undefined, (err) => {
  const error = err.response;
  // if (error.status === 401) {
  //   localStorage.removeItem("userToken");
  // }
});
export { http };
