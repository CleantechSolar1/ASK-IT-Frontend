import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // In Microsoft Teams iframe context, third-party cookies are blocked by
  // modern browsers. We store the JWT in localStorage after Teams SSO and
  // attach it via Authorization header so it reaches the backend.
  const teamsToken = localStorage.getItem("teams_token");
  if (teamsToken) {
    config.headers.Authorization = `Bearer ${teamsToken}`;
  }
  return config;
});

export default api;
