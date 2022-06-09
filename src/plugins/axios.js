import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "localhost:8080", Will Be Used Later
  headers: {
    Authorization: "Bearer xxxxxxxxxx",
  },
});
