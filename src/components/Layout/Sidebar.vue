<template>
  <aside
    :class="[
      'bg-white/95 backdrop-blur-xl border-r border-slate-200/50 flex flex-col transition-all duration-300 shadow-xl z-30',
      collapsed ? 'w-0 lg:w-20 overflow-hidden' : 'w-72',
      isMobile ? 'h-full pt-20' : 'relative h-full'
    ]"
  >
    <!-- COLLAPSE BUTTON - Only on Desktop -->
    <button
      v-if="!isMobile"
      @click="$emit('toggleSidebar')"
      class="absolute right-[-14px] top-8 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all duration-300 z-50"
    >
      <ChevronLeft v-if="!collapsed" size="16" />
      <ChevronRight v-else size="16" />
    </button>

    <!-- MENU -->
    <nav class="flex-1 px-4 space-y-2 overflow-y-auto pt-4">
      <router-link
        v-if="isAdmin"
        to="/dashboard"
        @click="handleNavClick"
        class="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-900 transition-all group [&.router-link-active]:bg-blue-50 [&.router-link-active]:text-blue-700"
      >
        <Home size="20" class="shrink-0" />
        <span v-if="!collapsed || isMobile" class="text-sm"> Dashboard </span>
      </router-link>

      <router-link
        v-if="isAdmin"
        to="/manage-admins"
        @click="handleNavClick"
        class="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-900 transition-all group [&.router-link-active]:bg-blue-50 [&.router-link-active]:text-blue-700"
      >
        <Users size="20" class="shrink-0" />
        <span v-if="!collapsed || isMobile" class="text-sm"> Manage Admins </span>
      </router-link>

      <router-link 
        to="/raise-ticket" 
        @click="handleNavClick"
        class="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-900 transition-all group [&.router-link-active]:bg-blue-50 [&.router-link-active]:text-blue-700"
      >
        <Ticket size="20" class="shrink-0" />
        <span v-if="!collapsed || isMobile" class="text-sm"> Raise Ticket </span>
      </router-link>

      <router-link 
        to="/my-tickets" 
        @click="handleNavClick"
        class="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-900 transition-all group [&.router-link-active]:bg-blue-50 [&.router-link-active]:text-blue-700"
      >
        <FileText size="20" class="shrink-0" />
        <span v-if="!collapsed || isMobile" class="text-sm"> My Tickets </span>
      </router-link>
    </nav>

    <!-- BOTTOM SECTION -->
    <div class="p-4 mt-auto border-t border-slate-100">
      <div
        v-if="!collapsed || isMobile"
        class="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100"
      >
        <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Your Role</div>
        <div class="font-bold text-slate-800 text-sm flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          {{ userRole }}
        </div>
      </div>

      <button
        class="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 py-2.5 rounded-xl transition-all font-semibold text-sm border border-red-100"
        @click="handleLogout"
      >
        <LogOut size="18" class="shrink-0" />
        <span v-if="!collapsed || isMobile"> Logout </span>
      </button>
    </div>
  </aside>
</template>

<script>
import {
  Home,
  Ticket,
  FileText,
  LogOut,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SidebarLayout",

  props: {
    collapsed: Boolean,
    isMobile: Boolean
  },

  emits: ["toggleSidebar"],

  computed: {
    ...mapGetters("auth", ["currentUser"]),

    isAdmin() {
      const role = this.currentUser?.role;
      return role ? String(role).toLowerCase() === "admin" : false;
    },

    userRole() {
      const role = this.currentUser?.role;
      return role ? String(role).charAt(0).toUpperCase() + String(role).slice(1).toLowerCase() : "User";
    },
  },

  components: {
    Home,
    Ticket,
    FileText,
    LogOut,
    Users,
    ChevronLeft,
    ChevronRight,
  },

  methods: {
    ...mapActions("auth", ["logout"]),

    handleNavClick() {
      if (this.isMobile) {
        this.$emit('toggleSidebar');
      }
    },

    async handleLogout() {
      try {
        await this.logout();
        window.location.href = "/login";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>


