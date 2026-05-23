import api from "../axios";

export const getUsersApi = () => api.get("/users");

export const toggleUserStatusApi = (id) => api.patch(`/users/${id}/toggle-status`);
