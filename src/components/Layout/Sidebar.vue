<template>
  <aside
    :class="[
      'bg-white transition-all duration-300 flex flex-col shadow-2xl z-50',
      collapsed ? 'w-0 lg:w-20' : 'w-72',
      isMobile ? 'fixed inset-y-0 left-0 pt-0 overflow-hidden' : 'h-full relative border-r border-slate-200',
    ]"
  >
    <!-- Collapse Button (Desktop Only) -->
    <button
      v-if="!isMobile"
      @click="$emit('toggleSidebar')"
      class="absolute right-[-14px] top-10 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 transition-all z-[60]"
    >
      <ChevronLeft v-if="!collapsed" size="16" />
      <ChevronRight v-else size="16" />
    </button>
    <!-- Logo area for Mobile Drawer -->
    <div
      v-if="isMobile"
      class="h-20 flex items-center px-6 border-b border-slate-100 shrink-0"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center p-1"
        >
          <img
            src="@/assets/cleanteck_logo.png"
            alt="Logo"
            class="w-full h-full object-contain"
          />
        </div>
        <span class="font-bold text-slate-800 tracking-tight">Ask IT</span>
      </div>
    </div>

    <!-- Navigation Links -->
    <nav 
      class="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto custom-scrollbar"
      :class="collapsed && !isMobile ? 'overflow-hidden' : ''"
    >
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        @click="handleNavClick"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative"
        :class="[
          $route.path === item.path
            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800',
        ]"
      >
        <component
          :is="item.icon"
          :size="20"
          :stroke-width="2.5"
          class="shrink-0 transition-transform group-hover:scale-110"
        />
        <span
          v-if="!collapsed || isMobile"
          class="font-bold text-sm tracking-tight"
        >
          {{ item.name }}
        </span>

        <!-- Tooltip for collapsed mode -->
        <div
          v-if="collapsed && !isMobile"
          class="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100]"
        >
          {{ item.name }}
        </div>
      </router-link>
    </nav>

    <!-- Sidebar Footer -->
    <div class="p-4 border-t border-slate-100 bg-slate-50/50">
      <div v-if="!collapsed || isMobile" class="mb-4 px-2">
        <p
          class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 opacity-70"
        >
          Your Role
        </p>
        <div
          class="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200 shadow-sm"
        >
          <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span
            class="text-xs font-bold text-slate-700 uppercase tracking-wide"
            >{{ userRole }}</span
          >
        </div>
      </div>

      <button
        @click="handleLogout"
        class="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group font-bold text-sm"
      >
        <LogOut
          :size="20"
          :stroke-width="2.5"
          class="shrink-0 transition-transform group-hover:-translate-x-1"
        />
        <span v-if="!collapsed || isMobile"> Logout </span>
      </button>
    </div>
  </aside>
</template>

<script>
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SidebarLayout",

  components: {
    LogOut,
    ChevronLeft,
    ChevronRight,
  },

  props: {
    collapsed: Boolean,
    isMobile: Boolean,
  },

  computed: {
    ...mapGetters("auth", ["currentUser"]),

    userRole() {
      return this.currentUser?.role || "User";
    },

    isAdmin() {
      return this.userRole.toLowerCase() === "admin";
    },

    menuItems() {
      const items = [];
      if (this.isAdmin) {
        items.push({
          name: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        });
        items.push({
          name: "Manage Admins",
          path: "/manage-admins",
          icon: Users,
        });
      }

      items.push({
        name: "Raise Ticket",
        path: "/raise-ticket",
        icon: PlusCircle,
      });
      items.push({ name: "My Tickets", path: "/my-tickets", icon: Ticket });

      return items;
    },
  },

  methods: {
    ...mapActions("auth", ["logout"]),

    async handleLogout() {
      await this.logout();
      window.location.href = "/login";
    },

    handleNavClick() {
      if (this.isMobile) {
        this.$emit("toggleSidebar");
      }
    },
  },
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
