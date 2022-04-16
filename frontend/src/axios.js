import axios from "axios";
import { getCookie } from "./Cookies";
import { AxiosRequestHeaders } from "axios";





const axiosJSONInst = axios.create({
  baseURL: "http://localhost:3003",
  timeout: 20000,
  headers: {
    "Content-type": "application/json",
    "accept": "application/json",
  },
});

axiosJSONInst.interceptors.request.use((configure) => {

  if (!configure.headers) {
    configure.headers = axiosJSONInst.headers;
  }

  const token = encodeURIComponent(getCookie("access_level"));
  if (token !== "") {
    configure.headers.Authorizaton = token;
  }
  return configure;
});


export default axiosJSONInst;