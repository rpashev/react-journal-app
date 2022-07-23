import axios from "axios";

let axiosAuth = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}journals`,
});

axiosAuth.interceptors.request.use(function (config) {
  //   const token = localStorage.getItem("token");
  //   config.headers.Authorization = `Bearer ` + token;
  config.headers.Authorization =
    `Bearer ` +
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmIyZjMzMDYxNmNkZGRiNzFlNjJmYWQiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJKb2hueSIsImlhdCI6MTY1ODU4MTQ3MH0.YJFnqpKJ0vDOaHCQ6ud-inDcO9sfnvVla7rWS9gppBE";
  config.headers.withCredentials = true;

  return config;
});

export default axiosAuth;
