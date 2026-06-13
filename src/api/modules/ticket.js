import api from "../axios";

export const createTicketApi = (payload) => {
  return api.post("/tickets", payload);
};

export const getMyTicketsApi = () => {
  return api.get("/tickets/my");
};

export const getAllTicketsApi = () => {
  return api.get("/tickets/admin");
};

export const getTicketByIdApi = (ticketId) => {
  return api.get(`/tickets/${ticketId}`);
};

export const addTicketCommentApi = (ticketId, payload) => {
  return api.post(`/tickets/admin/${ticketId}/comments`, payload);
};

export const updateTicketStatusApi = (ticketId, payload) => {
  return api.patch(`/tickets/admin/${ticketId}/status`, payload);
};

export const delegateTicketApi = (ticketId, email) => {
  return api.patch(`/tickets/admin/${ticketId}/delegate`, { email });
};

export const getAttachmentApi = (driveItemId) => {
  return api.get(`/tickets/attachment/${driveItemId}`, {
    responseType: "blob",
  });
};
