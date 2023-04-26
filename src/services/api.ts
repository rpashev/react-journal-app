import axios, { AxiosResponse } from "axios";
import { LoginInputState } from "../pages/Login/Login";
import axiosAuth from "./axios";
import { EntryInputState } from "../components/Entry/EntryFormDialog";

export default {
  login(inputs: LoginInputState) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}auth/login`, {
      email: inputs.email,
      password: inputs.password,
    });
  },

  register(formState: any) {
    //to be typed
    return axios.post(`${process.env.REACT_APP_BASE_URL}auth/signup`, {
      ...formState,
    });
  },

  getJournal(id: string | undefined) {
    return axiosAuth.get(`/${id}`);
  },

  updateJournal(id: string, formState: any) {
    //formState to be typed
    return axiosAuth.patch(`/${id}`, formState);
  },

  deleteJournal(id: string) {
    return axiosAuth.delete(`/${id}`);
  },

  getJournals() {
    return axiosAuth.get(`${process.env.REACT_APP_BASE_URL}journals`);
  },

  createEntry(data: EntryInputState) {
    const payload = {
      title: data.title,
      body: data.body,
      date: data.date,
    };
    return axiosAuth.post(`/${data.id}/create-entry`, payload);
  },

  getEntry(journalID: string, entryID: string) {
    return axiosAuth.get(`/${journalID}/${entryID}`);
  },

  editEntry(journalID: string, entryID: string, title: string, body: string) {
    const data = { title, body };
    return axiosAuth.patch(`/${journalID}/${entryID}`, data);
  },

  deleteEntry(journalID: string, entryID: string) {
    return axiosAuth.delete(`/${journalID}/${entryID}`);
  },
};
