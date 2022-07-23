import axiosAuth from "./axios";

export default {
  async getJournals() {
    return await axiosAuth.get(`${process.env.REACT_APP_BASE_URL}journals`);
  },
};
