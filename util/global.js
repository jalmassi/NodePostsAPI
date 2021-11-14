const URL = "https://api.hatchways.io/assessment/blog/posts";
const axios = require("axios");
const axiosInstance = axios.create({
  baseURL: URL,
});

module.exports.URL = URL;
module.exports.axiosInstance = axiosInstance;
