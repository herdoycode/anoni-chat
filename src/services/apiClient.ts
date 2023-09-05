import axios from "axios";
const token = localStorage.getItem("token");

const url = "https://chat-api-node.onrender.com/api";

export default axios.create({
  baseURL: url,
  headers: {
    "x-auth-token": token ? token : "",
  },
});