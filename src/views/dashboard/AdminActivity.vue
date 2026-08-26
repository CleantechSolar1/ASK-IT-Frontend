<template>
  <div class="max-w-6xl mx-auto py-8 px-4 space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-slate-800">Admin Activity</h2>
        <p class="text-slate-500 mt-1">
          Review ticket status changes, delegations, and admin comments.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <select
          v-model="exportScope"
          class="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 px-3 py-3 transition-all outline-none font-semibold shadow-sm"
        >
          <option value="filtered">Filtered</option>
          <option value="all">All</option>
        </select>
        <select
          v-model="exportFormat"
          class="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 px-3 py-3 transition-all outline-none font-semibold shadow-sm"
        >
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </select>
        <button
          @click="exportActivity"
          :disabled="exportLogs.length === 0"
          class="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 border border-blue-600 text-white hover:bg-blue-700 text-sm font-bold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download :size="16" />
          Export
        </button>
        <button
          @click="refreshActivity"
          class="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 text-sm font-bold transition-all shadow-sm"
        >
          <RefreshCw :size="16" :class="{ 'animate-spin': loading }" />
          Refresh
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] p-5">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Actions</p>
        <p class="text-3xl font-extrabold text-slate-800 mt-1">{{ activityLogs.length }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] p-5">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Status Changes</p>
        <p class="text-3xl font-extrabold text-blue-600 mt-1">{{ statusChangeCount }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] p-5">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Delegations</p>
        <p class="text-3xl font-extrabold text-indigo-600 mt-1">{{ delegationCount }}</p>
      </div>
    </div>

    <div class="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between gap-4">
        <h3 class="text-base font-bold text-slate-700">Recent Admin Actions</h3>
        <div class="relative max-w-xs w-full">
          <Search :size="17" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            v-model="search"
            type="text"
            placeholder="Search ticket or admin"
            class="w-full bg-white border border-slate-200 text-slate-700 placeholder-slate-400 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 pl-10 pr-3 py-2.5 transition-all outline-none"
          />
        </div>
      </div>

      <div v-if="loading && activityLogs.length === 0" class="py-14 flex items-center justify-center">
        <RefreshCw :size="28" class="animate-spin text-blue-500" />
      </div>

      <div v-else-if="filteredLogs.length === 0" class="py-16 flex flex-col items-center justify-center text-center">
        <div class="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
          <Activity :size="24" class="text-slate-400" />
        </div>
        <p class="text-sm font-semibold text-slate-700">No admin activity found</p>
        <p class="text-xs text-slate-400 mt-1">Actions will appear here after admins update tickets.</p>
      </div>

      <ul v-else class="divide-y divide-slate-100">
        <li
          v-for="log in filteredLogs"
          :key="log.key"
          class="px-6 py-4 hover:bg-slate-50/60 transition-colors"
        >
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div class="flex items-start gap-4 min-w-0">
              <div class="w-10 h-10 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">
                {{ initials(log.actorName || log.actorEmail) }}
              </div>
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="font-sans font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg text-[11px]">
                    {{ log.ticketId }}
                  </span>
                  <span class="inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold border" :class="actionClass(log.action)">
                    {{ actionLabel(log.action) }}
                  </span>
                </div>
                <p class="text-sm font-semibold text-slate-800 mt-2">
                  {{ log.actorName || log.actorEmail || "Unknown admin" }}
                </p>
                <p class="text-sm text-slate-500 mt-1">
                  {{ actionDescription(log) }}
                </p>
              </div>
            </div>
            <div class="lg:text-right shrink-0">
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Action Time</p>
              <p class="text-sm font-semibold text-slate-700 mt-1">{{ formatDateTime(log.createdAt) }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Activity, Download, RefreshCw, Search } from "lucide-vue-next";

export default {
  name: "AdminActivity",

  components: {
    Activity,
    Download,
    RefreshCw,
    Search,
  },

  data() {
    return {
      search: "",
      loading: false,
      exportScope: "filtered",
      exportFormat: "csv",
    };
  },

  computed: {
    ...mapGetters("ticket", ["tickets"]),

    activityLogs() {
      return this.tickets
        .flatMap((ticket) =>
          (ticket.actionLogs || []).map((log) => ({
            ...log,
            key: `${ticket._id}-${log._id || log.createdAt}-${log.action}`,
            ticketId: ticket.ticketId,
            ticketCategory: ticket.category,
          })),
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    filteredLogs() {
      const q = this.search.toLowerCase().trim();
      if (!q) return this.activityLogs;

      return this.activityLogs.filter((log) =>
        [
          log.ticketId,
          log.actorName,
          log.actorEmail,
          log.fromStatus,
          log.toStatus,
          log.delegatedFromName,
          log.delegatedFromEmail,
          log.delegatedToName,
          log.delegatedToEmail,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(q)),
      );
    },

    exportLogs() {
      return this.exportScope === "all" ? this.activityLogs : this.filteredLogs;
    },

    statusChangeCount() {
      return this.activityLogs.filter((log) => log.action === "status_updated").length;
    },

    delegationCount() {
      return this.activityLogs.filter((log) => log.action === "delegated").length;
    },
  },

  mounted() {
    this.refreshActivity();
  },

  methods: {
    ...mapActions("ticket", ["fetchAdminTickets"]),

    async refreshActivity() {
      this.loading = true;
      try {
        await this.fetchAdminTickets();
      } finally {
        this.loading = false;
      }
    },

    actionLabel(action) {
      if (action === "status_updated") return "Status Changed";
      if (action === "delegated") return "Delegated";
      if (action === "commented") return "Commented";
      return "Updated";
    },

    actionClass(action) {
      if (action === "status_updated") return "bg-blue-50 text-blue-700 border-blue-200";
      if (action === "delegated") return "bg-indigo-50 text-indigo-700 border-indigo-200";
      if (action === "commented") return "bg-emerald-50 text-emerald-700 border-emerald-200";
      return "bg-slate-50 text-slate-700 border-slate-200";
    },

    actionDescription(log) {
      if (log.action === "status_updated") {
        return `Changed status from ${log.fromStatus || "N/A"} to ${log.toStatus || "N/A"}.`;
      }

      if (log.action === "delegated") {
        const fromName = log.delegatedFromName || log.delegatedFromEmail || "Unassigned";
        const toName = log.delegatedToName || log.delegatedToEmail || "Unknown";
        return `Delegated from ${fromName} to ${toName}.`;
      }

      if (log.action === "commented") {
        return "Added a comment to the ticket.";
      }

      return "Updated this ticket.";
    },

    initials(name) {
      if (!name) return "?";
      return name
        .split(/[\s@.]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    },

    formatDateTime(date) {
      if (!date) return "N/A";
      return new Date(date).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },

    exportActivity() {
      const rows = this.exportLogs.map((log) => ({
        ticketId: log.ticketId || "",
        category: log.ticketCategory || "",
        action: this.actionLabel(log.action),
        actorName: log.actorName || "",
        actorEmail: log.actorEmail || "",
        fromStatus: log.fromStatus || "",
        toStatus: log.toStatus || "",
        delegatedFromName: log.delegatedFromName || "",
        delegatedFromEmail: log.delegatedFromEmail || "",
        delegatedToName: log.delegatedToName || "",
        delegatedToEmail: log.delegatedToEmail || "",
        description: this.actionDescription(log),
        actionTime: log.createdAt ? new Date(log.createdAt).toISOString() : "",
      }));

      const dateStamp = new Date().toISOString().split("T")[0];
      const scope = this.exportScope === "all" ? "all" : "filtered";
      const filename = `admin_activity_${scope}_${dateStamp}.${this.exportFormat}`;

      if (this.exportFormat === "json") {
        this.downloadFile(
          JSON.stringify(rows, null, 2),
          filename,
          "application/json;charset=utf-8",
        );
        return;
      }

      const headers = [
        "Ticket ID",
        "Category",
        "Action",
        "Actor Name",
        "Actor Email",
        "From Status",
        "To Status",
        "Delegated From Name",
        "Delegated From Email",
        "Delegated To Name",
        "Delegated To Email",
        "Description",
        "Action Time",
      ];

      const csvRows = rows.map((row) => [
        row.ticketId,
        row.category,
        row.action,
        row.actorName,
        row.actorEmail,
        row.fromStatus,
        row.toStatus,
        row.delegatedFromName,
        row.delegatedFromEmail,
        row.delegatedToName,
        row.delegatedToEmail,
        row.description,
        row.actionTime,
      ]);

      const csv = [
        headers.map(this.escapeCSV).join(","),
        ...csvRows.map((row) => row.map(this.escapeCSV).join(",")),
      ].join("\n");

      this.downloadFile(csv, filename, "text/csv;charset=utf-8");
    },

    escapeCSV(value) {
      if (value === null || value === undefined) return '""';
      return `"${String(value).replace(/"/g, '""')}"`;
    },

    downloadFile(content, filename, type) {
      const blob = new Blob([content], { type });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  },
};
</script>
