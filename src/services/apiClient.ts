import axios from "axios";
const token = localStorage.getItem("token");

const url = "https://sea-turtle-app-3i9d4.ondigitalocean.app/api";

export default axios.create({
  baseURL: url,
  headers: {
    "x-auth-token": token ? token : "",
  },
});
