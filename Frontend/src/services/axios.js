import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your Rails API URL
});

export default instance;
