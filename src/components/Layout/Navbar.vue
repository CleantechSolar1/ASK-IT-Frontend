<template>
  <header
    class="h-20 min-h-[5rem] bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50 shadow-sm"
  >
    <!-- Background Marquee - Hidden on Mobile -->
    <div
      class="absolute inset-y-0 right-[280px] left-[400px] z-0 pointer-events-none opacity-[0.85] hidden lg:flex items-center"
    >
      <div class="marquee-container w-full">
        <div class="marquee-content">
          <!-- Set 1 -->
          <img
            src="@/assets/target.jpeg"
            alt="Target"
            class="nav-marquee-img"
          />
          <img
            src="@/assets/target.jpeg"
            alt="Target"
            class="nav-marquee-img"
          />
          <img
            src="@/assets/target.jpeg"
            alt="Target"
            class="nav-marquee-img"
          />
          <img
            src="@/assets/target.jpeg"
            alt="Target"
            class="nav-marquee-img"
          />
          <img
            src="@/assets/target.jpeg"
            alt="Target"
            class="nav-marquee-img"
          />
          <!-- Set 2 (Duplicate for seamless loop) -->
          <img
            src="@/assets/target.jpeg"
            alt="Target"
            class="nav-marquee-img"
          />
          <img
            src="@/assets/target.jpeg"
            alt="Target"
            class="nav-marquee-img"
          />
          <img
            src="@/assets/target.jpeg"
            alt="Target"
            class="nav-marquee-img"
          />
          <img
            src="@/assets/target.jpeg"
            alt="Target"
            class="nav-marquee-img"
          />
          <img
            src="@/assets/target.jpeg"
            alt="Target"
            class="nav-marquee-img"
          />
        </div>
      </div>
    </div>

    <!-- LEFT: Hamburger + Logo -->
    <div class="flex items-center gap-4 relative z-10">
      <button
        @click="$emit('toggleSidebar')"
        class="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
      >
        <Menu size="24" />
      </button>

      <router-link
        :to="homeRoute"
        class="flex items-center gap-4 transition-all duration-300 group"
      >
        <div
          class="flex items-center justify-center w-[140px] sm:w-[160px] h-[48px] sm:h-[54px] bg-white border border-slate-100 rounded-xl px-3 shadow-sm group-hover:shadow-md transition-all shrink-0"
        >
          <img
            src="@/assets/cleanteck_logo.png"
            alt="Ask IT"
            class="h-full w-full object-contain"
          />
        </div>
        <div
          class="hidden sm:flex flex-col border-l border-slate-200 pl-4 h-10 justify-center"
        >
          <span
            class="font-bold text-xl text-slate-900 leading-none tracking-tight"
            >Ask IT</span
          >
          <span
            class="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1"
            >Support Portal</span
          >
        </div>
      </router-link>
    </div>

    <!-- RIGHT: User Profile -->
    <div class="flex items-center gap-4">
      <div
        class="flex items-center gap-3 py-1.5 px-3 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm"
      >
        <div
          class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-md"
        >
          {{ userInitial }}
        </div>

        <div class="hidden md:flex flex-col leading-tight pr-1">
          <span class="text-sm font-bold text-slate-800 truncate max-w-[150px]">
            {{ currentUser?.name || "User" }}
          </span>
          <span
            v-if="currentUser?.companyName"
            class="text-[10px] text-slate-500 font-bold truncate max-w-[150px] uppercase tracking-tighter"
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
.marquee-container {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
}

.marquee-content {
  display: flex;
  animation: marquee 30s linear infinite;
}

.nav-marquee-img {
  height: 62px;
  width: auto;
  margin-right: 50px;
  filter: opacity(0.95);
  object-fit: contain;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
