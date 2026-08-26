<template>
  <div class="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-0">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800">My Tickets</h2>
        <p class="text-sm sm:text-base text-slate-500 mt-1">Manage and track your submitted support requests.</p>
      </div>
      
      <router-link to="/raise-ticket" class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-blue-600/20 active:scale-95 w-full sm:w-auto">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        New Ticket
      </router-link>
    </div>

    <!-- Table Container -->
    <div class="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left whitespace-nowrap">
          <thead class="text-xs text-slate-500 bg-slate-50/80 uppercase font-semibold border-b border-slate-100">
            <tr>
              <th scope="col" class="px-6 py-4 tracking-wider">Ticket ID</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-center">Action</th>
              <th scope="col" class="px-6 py-4 tracking-wider">Category</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-center">Priority</th>
              <th scope="col" class="px-6 py-4 tracking-wider">Assigned To</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-center">Status</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-right">Created</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100/60 bg-transparent">
            <tr
              v-for="ticket in tickets"
              :key="ticket._id"
              class="bg-white hover:bg-slate-50/60 transition-all duration-300 group hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-[1px]"
            >
              <td class="px-6 py-4 border-l-4 border-transparent group-hover:border-blue-500 transition-colors">
                <span class="font-sans font-bold text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-lg text-[11px] tracking-wider">{{ ticket.ticketId }}</span>
              </td>

              <td class="px-6 py-4 text-center">
                <button
                  @click="openTicket(ticket)"
                  title="View Details"
                  class="p-2 rounded-xl bg-slate-50 text-slate-500 border border-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm inline-flex items-center justify-center transform active:scale-95 mx-auto"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </button>
              </td>

              <td class="px-6 py-4">
                <span class="font-semibold text-slate-800">{{ ticket.category }}</span>
              </td>

              <td class="px-6 py-4 text-center">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border"
                  :class="priorityClass(ticket.priority)"
                >
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="priorityDotClass(ticket.priority)"></span>
                  {{ ticket.priority }}
                </span>
              </td>

              <td class="px-6 py-4">
                <span class="text-slate-600 font-medium">{{ ticket.assignedToName || 'Unassigned' }}</span>
              </td>

              <td class="px-6 py-4 text-center">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border"
                  :class="statusClass(ticket.status)"
                >
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="statusDotClass(ticket.status)"></span>
                  {{ ticket.status }}
                </span>
              </td>

              <td class="px-6 py-4 text-right text-slate-500 font-medium">
                {{ formatDate(ticket.createdAt) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="!tickets || tickets.length === 0" class="py-16 flex flex-col items-center justify-center text-center">
        <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
        </div>
        <h3 class="text-lg font-semibold text-slate-800 mb-1">No tickets found</h3>
        <p class="text-slate-500 text-sm max-w-sm">You haven't submitted any support tickets yet. Click 'New Ticket' to get started.</p>
      </div>
    </div>

    <ticketModal :show="showModal" :ticket="selectedTicket" @close="showModal = false" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ticketModal from "@/components/common/ticketModal.vue";

export default {
  name: "MyTicketsView",
  components: {
    ticketModal,
  },

  data() {
    return {
      showModal: false,
      selectedTicket: {},
    };
  },

  computed: {
    ...mapGetters("ticket", ["tickets"]),
  },

  mounted() {
    this.fetchMyTickets();
  },

  methods: {
    ...mapActions("ticket", ["fetchMyTickets", "fetchTicketById"]),

    async openTicket(ticket) {
      try {
        this.selectedTicket = await this.fetchTicketById(ticket._id);
      } catch (error) {
        this.selectedTicket = ticket;
      }
      this.showModal = true;
    },

    priorityClass(priority) {
      if (priority === "High" || priority === "Critical") return "bg-red-50 text-red-700 border-red-200";
      if (priority === "Medium") return "bg-amber-50 text-amber-700 border-amber-200";
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    },
    
    priorityDotClass(priority) {
      if (priority === "High" || priority === "Critical") return "bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.5)]";
      if (priority === "Medium") return "bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.5)]";
      return "bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]";
    },

    statusClass(status) {
      if (status === "Received") return "bg-slate-50 text-slate-700 border-slate-200";
      if (status === "In Progress") return "bg-blue-50 text-blue-700 border-blue-200";
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    },
    
    statusDotClass(status) {
      if (status === "Received") return "bg-slate-500 shadow-[0_0_4px_rgba(100,116,139,0.5)]";
      if (status === "In Progress") return "bg-blue-500 shadow-[0_0_4px_rgba(59,130,246,0.5)]";
      return "bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]";
    },

    formatDate(date) {
      if (!date) return "N/A";
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
};
</script>
