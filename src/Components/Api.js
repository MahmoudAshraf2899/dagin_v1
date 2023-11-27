import axios from "axios";
const token = localStorage.getItem("token");

const API = axios.create({
  baseURL: "https://dajintest.environ-adapt.tk/",
  timeout: 5000,
  headers: {
    // Authorization: `Bearer ${token}`,
    "Content-type": "application/json",
    Accept: "*/*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "https://dajintest.environ-adapt.tk/",
  },
});
export const APISUBMIT = axios.create({
  baseURL: "https://dajintest.environ-adapt.tk/",
  timeout: 5000,
  headers: {
    // 'Content-Type': '*/*',
    // Authorization: `Bearer ${state.token.replace(/"/g, "")}`,
    "Content-Type": "multipart/form-data",
    Accept: "*/*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "https://dajintest.environ-adapt.tk/",
  },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log("Unauthorized Request!");
    }
    return Promise.reject(error.response.data || error);
  }
);

export default API;
