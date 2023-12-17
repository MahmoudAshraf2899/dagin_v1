import axios from "axios";
const token =
  localStorage.getItem("token") === null ? "" : localStorage.getItem("token");

const API = axios.create({
  baseURL: "https://nestjs-api.dajin-platform.com/",
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json",
    Accept: "*/*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "https://nestjs-api.dajin-platform.com/",
  },
});
export const APISUBMIT = axios.create({
  baseURL: "https://nestjs-api.dajin-platform.com/",
  timeout: 5000,
  headers: {
    // 'Content-Type': '*/*',
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    Accept: "*/*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "https://nestjs-api.dajin-platform.com/",
    /*
     * Production : https://nestjs-api.dajin-platform.com/
     * Test : https://dajintest.environ-adapt.tk/
     */
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
