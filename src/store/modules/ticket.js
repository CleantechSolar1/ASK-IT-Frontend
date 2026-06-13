import {
  createTicketApi,
  getMyTicketsApi,
  getAllTicketsApi,
  getTicketByIdApi,
  addTicketCommentApi,
  updateTicketStatusApi,
  delegateTicketApi,
} from "@/api/modules/ticket";

const state = {
  tickets: [],
};

const mutations = {
  SET_TICKETS(state, tickets) {
    state.tickets = tickets;
  },
};

const actions = {
  async createTicket({ commit }, payload) {
    const res = await createTicketApi(payload);
    commit("SET_TICKETS", res.data.data);
  },

  async fetchMyTickets({ commit }) {
    const res = await getMyTicketsApi();
    commit("SET_TICKETS", res.data.data);
  },

  async fetchAdminTickets({ commit }) {
    const res = await getAllTicketsApi();
    commit("SET_TICKETS", res.data.data);
  },

  async fetchTicketById(_, ticketId) {
    const res = await getTicketByIdApi(ticketId);
    return res.data.data;
  },

  async addTicketComment({ dispatch }, { ticketId, comment }) {
    const res = await addTicketCommentApi(ticketId, { comment });
    dispatch("fetchAdminTickets");
    return res.data.data;
  },

  async updateTicketStatus({ dispatch }, payload) {
    await updateTicketStatusApi(payload.ticketId, {
      status: payload.status,
    });
    dispatch("fetchAdminTickets");
  },

  async delegateTicket({ dispatch }, { ticketId, email }) {
    await delegateTicketApi(ticketId, email);
    dispatch("fetchAdminTickets");
  },
};

const getters = {
  tickets: (state) => state.tickets,

  totalTickets: (state) => state.tickets.length,

  openTickets: (state) =>
    state.tickets.filter((t) => t.status !== "Completed").length,

  completedTickets: (state) =>
    state.tickets.filter((t) => t.status === "Completed").length,

  pendingTickets: (state) =>
    state.tickets.filter((t) => t.status === "Pending").length,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
