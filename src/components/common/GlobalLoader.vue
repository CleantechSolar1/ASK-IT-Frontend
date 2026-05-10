<template>
  <transition name="fade">
    <div v-if="loading" class="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-xl">
      <div class="relative flex flex-col items-center">
        <!-- Subtle Glow Background -->
        <div class="absolute inset-0 bg-blue-500/5 rounded-full blur-[100px] animate-pulse"></div>
        
        <div class="relative group">
          <img 
            src="@/assets/target.jpeg" 
            alt="Mission 2028" 
            class="w-64 h-auto object-contain animate-float"
          />
          
          <!-- Decorative loading indicator -->
          <div class="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
            <div class="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div class="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div class="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "GlobalLoader",
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
