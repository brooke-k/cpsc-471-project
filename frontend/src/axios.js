import axios from "axios";

const axiosJSONInst = axios.create({
  baseURL: "http://localhost:3003",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    "accept": "application/json",
  },
});


export default axiosJSONInst;