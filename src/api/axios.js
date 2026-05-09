import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // In Microsoft Teams, the app runs in an iframe where third-party cookies
  // from the API domain (Render) are blocked by modern browsers.
  // We store the JWT in Vuex memory (in-memory only, not localStorage) and
  // attach it as an Authorization header on every request.
  // Using lazy require() here avoids a circular dependency:
  //   store → api/modules/auth → axios → store
  const store = require("@/store").default;
  const teamsToken = store.state.auth?.teamsToken;
  if (teamsToken) {
    config.headers.Authorization = `Bearer ${teamsToken}`;
  }
  return config;
});

export default api;
