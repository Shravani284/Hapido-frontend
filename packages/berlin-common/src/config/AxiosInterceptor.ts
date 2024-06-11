import axios from "axios";
import { BASE_URL } from "../../../../urlConst";
import { localeLang } from "../../../berlin-consumer/src/utils/getLang";

const logoutHandler = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("loginDetails");
  window.location.href = "/";
};


// const api = "http://54.87.191.245:5000"

// ------------------------------------ Authorized routes ------------------------------------
const ApiRequest = axios.create({
  baseURL: BASE_URL,
});
// ----------------------------- Interceptors authorized API Request ------------------------------

ApiRequest.interceptors.request.use(
  function (config: any) {
    let localToken = localStorage.getItem("token");
    let token = localToken ? JSON.parse(localToken) : "";
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: "Bearer " + token,
        platform: "WEB",
        "X-Platform": window.innerWidth > 768 ? "WEB" : "MOBILE",
      };
    } else {
      config.headers = {
        ...config.headers,
        platform: "WEB",
      };
    }

    // For GET requests, pass the language as a query parameter
    if (config.method !== "get") {
      config.headers = {
        ...config.headers,
        lang: localeLang,
      };
      // } else {


      //   // For other HTTP methods, include the language in the headers
      //   config.headers = {
      //     ...config.headers,
      //     lang: lang,
      //   };
    }
    return config;
  },


  (error) => {
    return new Promise((resolve, reject) => {
      console.log(resolve);
      reject(error);
    });
  }
);

// ------------------------------ Interceptors authorized API Response ------------------------------

ApiRequest.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      logoutHandler();
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export { ApiRequest };
