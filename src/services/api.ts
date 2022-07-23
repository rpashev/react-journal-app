import axios, { AxiosResponse } from "axios";
import axiosAuth from "./axios";

export default {
  async getJournals() {
    return await axiosAuth.get(`${process.env.REACT_APP_BASE_URL}journals`);
  },

  login(email: string, password: string) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}auth/login`, {
      email,
      password,
    });
  },
};

// const response = await fetch(
//   `${process.env.REACT_APP_BASE_URL}auth/login`,
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify({ email, password }),
//   }
// );
// const data = await response.json();
// return data;
// },
