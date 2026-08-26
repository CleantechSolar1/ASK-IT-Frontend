<template>
  <div class="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-0 flex flex-col h-full">
    <!-- Page header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800">IT Policy Assistant</h2>
        <p class="text-sm sm:text-base text-slate-500 mt-1">
          Ask about Cleantech Solar's IT policies or how to do something in Business Central.
          Every answer cites the document it comes from.
        </p>
      </div>

      <router-link
        to="/raise-ticket"
        class="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm active:scale-95 w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Still stuck? Raise a ticket
      </router-link>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 flex-1 items-start">
      <!-- Chat card -->
      <div
        class="lg:col-span-2 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col min-h-[65vh] lg:h-full"
      >
        <!-- Chat body: the embed renders its own titled header, so the card adds no title of its own -->
        <div class="relative flex-1 flex flex-col">
          <template v-if="agentUrl">
            <div
              v-if="!iframeLoaded && !loadTimedOut"
              class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 z-10"
            >
              <div class="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              <p class="text-sm font-medium text-slate-500">Connecting to the assistant…</p>
            </div>

            <!-- Load-failure fallback: shown when the embed hasn't loaded within the timeout -->
            <div
              v-if="loadTimedOut && !iframeLoaded"
              class="absolute inset-0 flex flex-col items-center justify-center text-center gap-4 bg-white z-10 p-8"
            >
              <div class="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                <svg class="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-800">The assistant is taking longer than expected</h3>
                <p class="text-sm text-slate-500 mt-1 max-w-md">
                  It may be busy or temporarily unavailable. Try again, or raise a ticket and the IT team
                  will pick it up.
                </p>
              </div>
              <div class="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="retryLoad"
                >
                  Try again
                </button>
                <router-link
                  to="/raise-ticket"
                  class="text-slate-600 hover:text-slate-800 text-sm font-medium underline underline-offset-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Raise a ticket
                </router-link>
              </div>
            </div>

            <iframe
              :key="iframeKey"
              :src="agentUrl"
              title="Cleantech IT Policy Assistant"
              class="flex-1 w-full border-0"
              allow="clipboard-write"
              @load="onIframeLoad"
            ></iframe>
          </template>

          <!-- Unconfigured state: keeps the app healthy before the agent is connected -->
          <div v-else class="flex-1 flex flex-col items-center justify-center text-center p-8 gap-4">
            <div class="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-800">Assistant not connected yet</h3>
              <p class="text-sm text-slate-500 mt-1 max-w-md">
                Set <code class="font-sans text-xs bg-slate-100 px-1.5 py-0.5 rounded">VUE_APP_COPILOT_AGENT_URL</code>
                in the frontend <code class="font-sans text-xs bg-slate-100 px-1.5 py-0.5 rounded">.env</code> to the
                Copilot Studio web-app embed URL, then restart the dev server or rebuild.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Side panel -->
      <aside class="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-5">
        <h3 class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Try asking</h3>

        <p class="text-xs font-medium text-slate-500 mt-3">IT policies</p>
        <div class="flex flex-wrap gap-2 mt-2">
          <button
            v-for="q in startersPolicies"
            :key="q"
            type="button"
            class="text-xs text-left text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
            @click="copyQuestion(q)"
          >
            {{ q }}
          </button>
        </div>

        <p class="text-xs font-medium text-slate-500 mt-3">Business Central</p>
        <div class="flex flex-wrap gap-2 mt-2">
          <button
            v-for="q in startersErp"
            :key="q"
            type="button"
            class="text-xs text-left text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
            @click="copyQuestion(q)"
          >
            {{ q }}
          </button>
        </div>

        <p class="text-xs text-slate-400 mt-2.5">Click a question to copy it, then paste it in the chat.</p>

        <hr class="border-slate-100 my-5" />

        <h3 class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">What it covers</h3>

        <ul class="mt-3 space-y-2">
          <li v-for="p in policies" :key="p.name" class="flex items-baseline justify-between gap-3">
            <p class="text-sm text-slate-700">{{ p.name }}</p>
            <span class="text-xs text-slate-400 shrink-0">v{{ p.ver }}</span>
          </li>
        </ul>

        <div class="mt-4 rounded-xl bg-slate-50 border border-slate-100 p-3.5">
          <p class="text-sm font-medium text-slate-700">Business Central (ERP)</p>
          <p class="text-xs text-slate-500 mt-1 leading-relaxed">
            Logging in, vendors, projects, indents and purchase orders, GRN and SRN,
            invoices and payment milestones — from the official user manuals and process flows.
          </p>
        </div>

        <hr class="border-slate-100 my-5" />

        <p class="text-xs text-slate-500 leading-relaxed">
          If you think a security incident is happening right now, don't use the chat — email
          <a href="mailto:itsupport@cleantechsolar.com" class="text-blue-500 hover:underline">itsupport@cleantechsolar.com</a>
          straight away.
        </p>
      </aside>
    </div>

    <!-- Footnote -->
    <p class="text-xs text-slate-400 mt-3 px-1">
      Answers are generated from Cleantech Solar's official IT policy documents and Business Central guides.
      For anything they don't cover, contact
      <a href="mailto:itsupport@cleantechsolar.com" class="text-blue-500 hover:underline">itsupport@cleantechsolar.com</a>.
    </p>

    <!-- Copy toast -->
    <transition name="toast">
      <p
        v-if="toast"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white text-xs rounded-lg px-3.5 py-2 shadow-lg"
        role="status"
      >
        {{ toast }}
      </p>
    </transition>
  </div>
</template>

<script>
export default {
  name: "PolicyAssistant",

  data() {
    return {
      agentUrl: process.env.VUE_APP_COPILOT_AGENT_URL || "",
      iframeLoaded: false,
      loadTimedOut: false,
      loadTimer: null,
      iframeKey: 0,
      toast: "",
      toastTimer: null,
      startersPolicies: [
        "What are the password requirements?",
        "How do I report a phishing email?",
        "My laptop was lost or stolen — what do I do?",
      ],
      startersErp: [
        "How do I create an indent in Business Central?",
        "How do I post a GRN against a purchase order?",
        "Why can't the next step see my document?",
      ],
      policies: [
        { name: "IT General Policy", ver: "1.1" },
        { name: "IT Security Policy", ver: "1.1" },
        { name: "IT Backup Policy", ver: "1.1" },
        { name: "Incident Reporting Policy", ver: "1.0" },
        { name: "IT Business Continuity Plan", ver: "1.1" },
        { name: "IT Asset Management Policy", ver: "1.1" },
      ],
    };
  },

  mounted() {
    if (this.agentUrl) this.startLoadTimer();
  },

  beforeUnmount() {
    clearTimeout(this.toastTimer);
    clearTimeout(this.loadTimer);
  },

  methods: {
    startLoadTimer() {
      clearTimeout(this.loadTimer);
      this.loadTimer = setTimeout(() => {
        if (!this.iframeLoaded) this.loadTimedOut = true;
      }, 15000);
    },

    onIframeLoad() {
      this.iframeLoaded = true;
      this.loadTimedOut = false;
      clearTimeout(this.loadTimer);
    },

    retryLoad() {
      this.iframeLoaded = false;
      this.loadTimedOut = false;
      this.iframeKey += 1;
      this.startLoadTimer();
    },

    async copyQuestion(q) {
      let ok = false;
      try {
        await navigator.clipboard.writeText(q);
        ok = true;
      } catch {
        ok = false;
      }
      this.toast = ok ? "Copied — paste it in the chat" : "Couldn't copy on this browser";
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => (this.toast = ""), 2200);
    },
  },
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.15s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
}
</style>
