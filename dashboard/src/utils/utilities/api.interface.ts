import axios from "axios";
import { API_URL } from "../../environment";
import toast from "./toast";

export default {
  post: async (endpoint?: string, body?: object) => {
    try {
      return await axios.post(`${API_URL}${endpoint}`, body);
    } catch (error) {
      toast.error("An error occured");
      console.log(error);
    }
  },
  put: async (endpoint?: string, body?: object) => {
    try {
      return await axios.put(`${API_URL}${endpoint}`, body);
    } catch (error) {
      toast.error("An error occured");
      console.log(error);
    }
  },
  delete: async (endpoint?: string, body?: object) => {
    try {
      return await axios.delete(`${API_URL}${endpoint}`, body);
    } catch (error) {
      toast.error("An error occured");
      console.log(error);
    }
  },
  get: async (endpoint?: string) => {
    try {
      return await axios.get(`${API_URL}${endpoint}`);
    } catch (error) {
      toast.error("An error occured");
      console.log(error);
    }
  },
};
