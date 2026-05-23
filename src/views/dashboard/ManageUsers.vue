<template>
  <div class="max-w-5xl mx-auto py-8 px-4">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold tracking-tight text-slate-800">Manage Users</h2>
      <p class="text-slate-500 mt-1">
        View and control access for all users in your organisation.
      </p>
    </div>

    <!-- Stats strip -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] p-5 flex flex-col gap-1">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Users</p>
        <p class="text-3xl font-extrabold text-slate-800">{{ users.length }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] p-5 flex flex-col gap-1">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Active</p>
        <p class="text-3xl font-extrabold text-emerald-500">{{ activeCount }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] p-5 flex flex-col gap-1">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Inactive</p>
        <p class="text-3xl font-extrabold text-red-400">{{ inactiveCount }}</p>
      </div>
    </div>

    <!-- Search bar -->
    <div class="mb-5 relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z" />
        </svg>
      </div>
      <input
        v-model="search"
        type="text"
        placeholder="Search by name or email…"
        class="bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full pl-11 pr-4 py-3.5 transition-all outline-none shadow-sm"
      />
    </div>

    <!-- Table Card -->
    <div class="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
      <!-- Table header row -->
      <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
        <h3 class="text-base font-bold text-slate-700">Organisation Members</h3>
        <button
          @click="fetchUsers"
          title="Refresh"
          class="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
        >
          <svg class="w-4 h-4" :class="{ 'animate-spin': usersLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582M20 20v-5h-.581M4.582 9A8 8 0 0 1 19.419 15M19.419 15A8 8 0 0 1 4.582 9" />
          </svg>
        </button>
      </div>

      <!-- Loading skeleton -->
      <div v-if="usersLoading && users.length === 0" class="divide-y divide-slate-100">
        <div v-for="n in 5" :key="n" class="flex items-center gap-4 px-6 py-4 animate-pulse">
          <div class="w-10 h-10 rounded-full bg-slate-200 shrink-0"></div>
          <div class="flex-1 space-y-2">
            <div class="h-3 bg-slate-200 rounded w-1/3"></div>
            <div class="h-2.5 bg-slate-100 rounded w-1/2"></div>
          </div>
          <div class="w-16 h-7 bg-slate-200 rounded-full"></div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="filteredUsers.length === 0" class="py-16 flex flex-col items-center justify-center text-center">
        <div class="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
          <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p class="text-sm font-semibold text-slate-700">No users found</p>
        <p class="text-xs text-slate-400 mt-1">Try adjusting your search.</p>
      </div>

      <!-- User rows -->
      <ul v-else class="divide-y divide-slate-100">
        <li
          v-for="user in filteredUsers"
          :key="user._id"
          class="flex items-center justify-between px-6 py-4 hover:bg-slate-50/60 transition-colors group"
        >
          <!-- Avatar + info -->
          <div class="flex items-center gap-4 min-w-0">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-sm"
              :class="avatarColor(user.email)"
            >
              {{ initials(user.name || user.email) }}
            </div>
            <div class="min-w-0">
              <p class="text-sm font-semibold text-slate-800 truncate">{{ user.name || '—' }}</p>
              <p class="text-xs text-slate-500 truncate">{{ user.email }}</p>
            </div>
          </div>

          <!-- Right side: role badge + status + toggle -->
          <div class="flex items-center gap-3 shrink-0 ml-4">
            <!-- Role badge -->
            <span
              class="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide"
              :class="roleBadgeClass(user.role)"
            >
              {{ user.role }}
            </span>

            <!-- Active / Inactive badge -->
            <span
              class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
              :class="user.isActive
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                : 'bg-red-50 text-red-500 border border-red-100'"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="user.isActive ? 'bg-emerald-500' : 'bg-red-400'"
              ></span>
              {{ user.isActive ? 'Active' : 'Inactive' }}
            </span>

            <!-- Toggle switch -->
            <button
              @click="handleToggle(user)"
              :disabled="togglingId === user._id"
              :title="user.isActive ? 'Deactivate user' : 'Activate user'"
              class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
              :class="user.isActive ? 'bg-emerald-500' : 'bg-slate-300'"
            >
              <!-- Spinner overlay -->
              <span v-if="togglingId === user._id" class="absolute inset-0 flex items-center justify-center">
                <svg class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </span>
              <span
                v-else
                class="inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300"
                :class="user.isActive ? 'translate-x-6' : 'translate-x-1'"
              ></span>
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Toast notification -->
    <transition name="toast-slide">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold"
        :class="toast.success
          ? 'bg-emerald-600 text-white'
          : 'bg-red-600 text-white'"
      >
        <svg v-if="toast.success" class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const AVATAR_COLORS = [
  "bg-gradient-to-br from-blue-500 to-indigo-600",
  "bg-gradient-to-br from-violet-500 to-purple-600",
  "bg-gradient-to-br from-emerald-500 to-teal-600",
  "bg-gradient-to-br from-amber-500 to-orange-500",
  "bg-gradient-to-br from-rose-500 to-pink-600",
  "bg-gradient-to-br from-cyan-500 to-sky-600",
];

export default {
  name: "ManageUsers",

  data() {
    return {
      search: "",
      toast: { show: false, message: "", success: true },
    };
  },

  computed: {
    ...mapGetters("user", ["users", "usersLoading", "togglingId"]),

    filteredUsers() {
      const q = this.search.toLowerCase().trim();
      if (!q) return this.users;
      return this.users.filter(
        (u) =>
          u.name?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q)
      );
    },

    activeCount() {
      return this.users.filter((u) => u.isActive).length;
    },

    inactiveCount() {
      return this.users.filter((u) => !u.isActive).length;
    },
  },

  mounted() {
    this.fetchUsers();
  },

  methods: {
    ...mapActions("user", ["fetchUsers", "toggleUserStatus"]),

    async handleToggle(user) {
      const wasActive = user.isActive;
      try {
        await this.toggleUserStatus(user._id);
        this.showToast(
          `${user.name || user.email} ${wasActive ? "deactivated" : "activated"} successfully.`,
          true
        );
      } catch (err) {
        this.showToast(
          err.response?.data?.message || "Failed to update user status.",
          false
        );
      }
    },

    showToast(message, success = true) {
      this.toast = { show: true, message, success };
      setTimeout(() => (this.toast.show = false), 3500);
    },

    initials(str) {
      if (!str) return "?";
      const parts = str.split(/[\s@.]+/);
      return parts
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase() || "")
        .join("");
    },

    avatarColor(email) {
      if (!email) return AVATAR_COLORS[0];
      const idx = email.charCodeAt(0) % AVATAR_COLORS.length;
      return AVATAR_COLORS[idx];
    },

    roleBadgeClass(role) {
      if (role === "admin")
        return "bg-blue-50 text-blue-600 border border-blue-100";
      if (role === "subadmin")
        return "bg-violet-50 text-violet-600 border border-violet-100";
      return "bg-slate-100 text-slate-500 border border-slate-200";
    },
  },
};
</script>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
