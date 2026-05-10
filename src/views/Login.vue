<template>
  <div
    class="min-h-screen relative flex items-center justify-center bg-slate-900 selection:bg-blue-500/20"
  >
    <!-- Background Image -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <img 
        src="@/assets/solar_wind.jpeg" 
        alt="Background" 
        class="w-full h-full object-cover opacity-60"
      />
      <div class="absolute inset-0 bg-slate-950/40"></div>
    </div>

    <!-- Card Wrapper -->
    <div class="relative z-10 w-full max-w-[440px] mx-auto px-4 py-12">
        <!-- White Login Card -->
        <div
          class="bg-white p-8 sm:p-10 rounded-[2rem] shadow-2xl transition-all duration-300"
        >
          <!-- Logo Icon -->
          <div class="flex justify-center mb-6">
            <img 
              src="@/assets/cleanteck_logo.png" 
              alt="Cleantech Logo" 
              class="h-16 w-auto object-contain"
            />
          </div>

          <h2
            class="text-2xl font-bold mb-2 text-center text-slate-800"
          >
            Welcome Back
          </h2>
          <p class="text-center text-slate-500 mb-8 text-sm">
            Please sign in to continue.
          </p>

          <!-- Form Elements -->
          <div class="space-y-5">
            <!-- Microsoft Login Button -->
            <button
              @click.prevent="loginWithMicrosoft"
              class="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl p-3.5 mt-4 transition-all duration-300 transform active:scale-[0.98] hover:bg-slate-50 hover:shadow-sm"
            >
              <svg class="w-5 h-5" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                <path fill="#f25022" d="M1 1h9v9H1z" />
                <path fill="#00a4ef" d="M11 1h9v9h-9z" />
                <path fill="#7fba00" d="M1 11h9v9H1z" />
                <path fill="#ffb900" d="M11 11h9v9h-9z" />
              </svg>
              Sign in with Microsoft
            </button>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "LoginView",

  methods: {
    ...mapActions("auth", ["loginMicrosoft"]),

    async loginWithMicrosoft() {
      await this.loginMicrosoft();
    },
  },
};
</script>
