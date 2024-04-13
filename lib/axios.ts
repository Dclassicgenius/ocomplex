import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://o-complex.com:1337",

  headers: {
    "Content-Type": "application/json",
  },
});
