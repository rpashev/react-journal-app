import axios, { AxiosResponse } from "axios";
import { InputState } from "../pages/Login/Login";
import axiosAuth from "./axios";

export default {
  getJournals() {
    return axiosAuth.get(`${process.env.REACT_APP_BASE_URL}journals`);
  },

  login(inputs: InputState) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}auth/login`, {
      email: inputs.email,
      password: inputs.password,
    });
  },
};
