import axios from "axios";
import { config } from "src/utils/Constants";

var url = config.url.API_URL;

const request = axios.create({
  baseURL: url,
  crossDomain: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      window.location.href = "/login";
    }
  }
);

export default request;
