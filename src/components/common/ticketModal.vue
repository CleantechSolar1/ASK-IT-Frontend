<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all"
  >
    <div
      class="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
    >
      <!-- Header -->
      <div
        class="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 bg-blue-100 text-blue-600 rounded-xl">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-800">Ticket Details</h3>
        </div>
        <button
          @click="$emit('close')"
          class="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-8 overflow-y-auto">
        <div class="space-y-6">
          <!-- ID & Date Row -->
          <div
            class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100"
          >
            <div>
              <p
                class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1"
              >
                Ticket ID
              </p>
              <p
                class="font-mono font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg inline-block text-sm"
              >
                {{ ticket.ticketId }}
              </p>
            </div>
            <div class="sm:text-right">
              <p
                class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1"
              >
                Created on
              </p>
              <p class="text-sm font-medium text-slate-700">
                {{
                  new Date(ticket.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                }}
              </p>
            </div>
          </div>

          <!-- Category, Priority, Status, Department Row -->
          <div
            class="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-4 border-b border-slate-100"
          >
            <div>
              <p
                class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5"
              >
                Raised By
              </p>
              <p
                class="text-sm font-medium text-slate-800 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                {{ ticket.userId?.name || "Unknown" }}
              </p>
            </div>
            <div>
              <p
                class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5"
              >
                Department
              </p>
              <p
                class="text-sm font-medium text-slate-800 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
                {{ ticket.department || "N/A" }}
              </p>
            </div>
            <div>
              <p
                class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5"
              >
                Country
              </p>
              <p
                class="text-sm font-medium text-slate-800 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                {{ ticket.country || "N/A" }}
              </p>
            </div>
          </div>

          <!-- Category, Priority, Status Row -->
          <div
            class="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-4 border-b border-slate-100"
          >
            <div>
              <p
                class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5"
              >
                Category
              </p>
              <p
                class="text-sm font-medium text-slate-800 flex items-center gap-2"
              >
                <span class="w-2 h-2 rounded-full bg-blue-400"></span>
                {{ ticket.category }}
              </p>
            </div>
            <div>
              <p
                class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5"
              >
                Priority
              </p>
              <span
                class="inline-flex px-2.5 py-1 text-xs font-bold rounded-full border transition-colors"
                :class="priorityClass(ticket.priority)"
              >
                {{ ticket.priority }}
              </span>
            </div>
            <div>
              <p
                class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5"
              >
                Status
              </p>
              <span
                class="inline-flex px-2.5 py-1 text-xs font-bold rounded-full border transition-colors"
                :class="statusClass(ticket.status)"
              >
                {{ ticket.status }}
              </span>
            </div>
          </div>

          <!-- Description -->
          <div>
            <p
              class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3"
            >
              Description
            </p>
            <div class="bg-slate-50 border border-slate-100 rounded-xl p-4">
              <p
                class="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap"
              >
                {{ ticket.description }}
              </p>
            </div>
          </div>

          <!-- Attachments Preview -->
          <div v-if="ticket.attachments && ticket.attachments.length > 0">
            <p
              class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3"
            >
              Attachments
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div v-for="att in ticket.attachments" :key="att._id" class="relative group aspect-w-16 aspect-h-9 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-2 shadow-sm">
                <!-- Image Preview -->
                <img v-if="att.mimeType && att.mimeType.startsWith('image/')" :src="attachmentUrls[att.driveItemId]" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt="Attachment Preview" />
                
                <!-- File Icon for Non-Images -->
                <div v-else class="flex flex-col items-center justify-center p-4">
                  <svg class="w-8 h-8 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  <span class="text-xs font-medium text-slate-600 truncate w-full text-center">{{ att.name }}</span>
                </div>
                
                <div v-if="!attachmentUrls[att.driveItemId] && att.mimeType?.startsWith('image/')" class="absolute inset-0 flex items-center justify-center bg-slate-50">
                  <svg class="animate-spin h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                
                <!-- Overlay to view full image (optional enhancement) -->
                <a v-if="attachmentUrls[att.driveItemId]" :href="attachmentUrls[att.driveItemId]" target="_blank" class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex justify-end"
      >
        <button
          @click="$emit('close')"
          class="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 px-6 py-2.5 rounded-xl font-medium transition-all shadow-sm active:scale-95"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAttachmentApi } from "@/api/modules/ticket";

export default {
  props: {
    show: Boolean,
    ticket: Object,
  },
  data() {
    return {
      attachmentUrls: {},
    };
  },
  watch: {
    show(newVal) {
      if (newVal && this.ticket && this.ticket.attachments) {
        this.loadAttachments();
      } else {
        // Cleanup object URLs when modal closes
        Object.values(this.attachmentUrls).forEach(url => URL.revokeObjectURL(url));
        this.attachmentUrls = {};
      }
    }
  },
  mounted() {
    console.log("Ticket Modal Mounted with ticket:", this.ticket);
  },
  methods: {
    async loadAttachments() {
      for (const att of this.ticket.attachments) {
        if (att.mimeType && att.mimeType.startsWith('image/') && !this.attachmentUrls[att.driveItemId]) {
          try {
            const response = await getAttachmentApi(att.driveItemId);
            const blob = response.data;
            const url = URL.createObjectURL(blob);
            this.attachmentUrls = { ...this.attachmentUrls, [att.driveItemId]: url };
          } catch (error) {
            console.error("Failed to load attachment:", error);
          }
        }
      }
    },
    priorityClass(priority) {
      if (priority === "High" || priority === "Critical")
        return "bg-red-50 text-red-700 border-red-200";
      if (priority === "Medium")
        return "bg-amber-50 text-amber-700 border-amber-200";
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    },

    statusClass(status) {
      if (status === "Received")
        return "bg-slate-50 text-slate-700 border-slate-200";
      if (status === "In Progress")
        return "bg-blue-50 text-blue-700 border-blue-200";
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    },
  },
};
</script>
