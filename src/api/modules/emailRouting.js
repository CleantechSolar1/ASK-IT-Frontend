import api from "../axios";

export const getEmailRoutingApi = () => api.get("/email-routing");

export const updateEmailRoutingApi = (category, recipients) =>
  api.patch("/email-routing", { category, recipients });
