<template>
  <div class="h-screen flex flex-col bg-slate-50 relative overflow-hidden font-sans">
    <!-- Premium Mesh Gradient Background -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-[120px] pointer-events-none"></div>
<!-- test comment for deployment -->
    <template v-if="!isAuthPage">
      <Navbar @toggleSidebar="toggleSidebar" />
      

      <div class="flex flex-1 overflow-hidden z-10 relative">
        <!-- Sidebar Backdrop for Mobile -->
        <transition name="fade-backdrop">
          <div 
            v-if="isMobile && !collapsed" 
            class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-20 lg:hidden"
            @click="toggleSidebar"
          ></div>
        </transition>

        <Sidebar 
          :collapsed="collapsed" 
          :isMobile="isMobile"
          @toggleSidebar="toggleSidebar" 
          :class="[
            isMobile ? 'fixed inset-y-0 left-0 z-[60]' : 'relative z-20 h-full shrink-0',
            isMobile && collapsed ? '-translate-x-full' : 'translate-x-0'
          ]"
        />

        <main class="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          <div class="max-w-7xl mx-auto min-h-full">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </main>
      </div>
    </template>

    <template v-else>
      <div class="z-10 w-full h-full overflow-y-scroll" style="scrollbar-color: initial; scrollbar-width: auto;">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </template>
  </div>
</template>

<script>
import Navbar from "@/components/Layout/Navbar.vue";
import Sidebar from "@/components/Layout/Sidebar.vue";

export default {
  components: { Navbar, Sidebar },

  data() {
    return {
      collapsed: false,
      isMobile: false,
    };
  },

  computed: {
    isAuthPage() {
      return ["/login"].includes(this.$route.path);
    },
  },

  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  },

  methods: {
    checkMobile() {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth < 1024;
      
      // Auto-collapse on mobile, auto-expand on desktop if switching
      if (this.isMobile && !wasMobile) {
        this.collapsed = true;
      } else if (!this.isMobile && wasMobile) {
        this.collapsed = false;
      }
    },
    toggleSidebar() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style>
/* Global Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Backdrop Fade Transition */
.fade-backdrop-enter-active,
.fade-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.fade-backdrop-enter-from,
.fade-backdrop-leave-to {
  opacity: 0;
}
</style>

