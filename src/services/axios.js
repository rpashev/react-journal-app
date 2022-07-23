import axios from "axios";

let axiosAuth = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}journals`,
});

axiosAuth.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ` + token;
  config.headers.withCredentials = true;

  return config;
});

export default axiosAuth;
