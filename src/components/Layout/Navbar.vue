<template>
  <header
    class="h-20 min-h-[5rem] bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50 shadow-sm"
  >
    <!-- LEFT: Hamburger + Logo -->
    <div class="flex items-center gap-2 sm:gap-4">
      <button 
        @click="$emit('toggleSidebar')"
        class="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
      >
        <Menu size="24" />
      </button>

      <router-link
        :to="homeRoute"
        class="flex items-center gap-3 transition-all duration-300 group"
      >
        <div
          class="flex items-center justify-center w-[120px] sm:w-[160px] h-[44px] sm:h-[54px] bg-white border border-slate-100 rounded-xl px-2 sm:px-3 shadow-sm group-hover:shadow-md transition-all shrink-0"
        >
          <img
            src="@/assets/cleanteck_logo.png"
            alt="Ask IT"
            class="h-full w-full object-contain"
          />
        </div>
        <div class="hidden sm:flex flex-col">
          <span class="font-bold text-lg text-slate-900 leading-none"
            >Ask IT</span
          >
          <span class="text-[10px] text-blue-600 font-bold uppercase tracking-wider mt-0.5"
            >Support Portal</span
          >
        </div>
      </router-link>
    </div>

    <!-- RIGHT: User Profile -->
    <div class="flex items-center gap-3">
      <div
        class="flex items-center gap-3 py-1.5 px-2 rounded-xl border border-transparent hover:border-slate-100 transition-all"
      >
        <div
          class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-sm"
        >
          {{ userInitial }}
        </div>

        <div class="hidden md:flex flex-col leading-tight">
          <span class="text-sm font-semibold text-slate-800 truncate max-w-[120px]">
            {{ currentUser?.name || "User" }}
          </span>
          <span
            v-if="currentUser?.companyName"
            class="text-[10px] text-slate-500 font-medium truncate max-w-[120px]"
          >
            {{ currentUser.companyName }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { Menu } from "lucide-vue-next";
import { mapGetters } from "vuex";

export default {
  name: "NavbarLayout",

  components: {
    Menu,
  },

  emits: ["toggleSidebar"],

  computed: {
    ...mapGetters("auth", ["currentUser"]),

    homeRoute() {
      if (!this.currentUser) return "/login";
      const role = this.currentUser?.role?.toLowerCase();
      return role === "admin" ? "/dashboard" : "/my-tickets";
    },

    userInitial() {
      const user = this.currentUser;
      if (!user) return "?";
      if (user.name && user.name.trim()) {
        return user.name.trim().charAt(0).toUpperCase();
      }
      if (user.email) {
        return user.email.charAt(0).toUpperCase();
      }
      return "?";
    },
  },
};
</script>


<style scoped>
</style>

