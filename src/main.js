import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import "./assets/css/main.css";
import '@fortawesome/fontawesome-free/css/all.min.css'

import { inTeams, initializeTeams, getTeamsAuthToken } from "./utils/teams";

// Create app WITHOUT installing the router yet.
// The router triggers its initial navigation (and beforeEach guards) the moment
// it is installed via app.use(router). If we install it immediately, beforeEach
// calls checkAuth → GET /auth/me → 401 before Teams SSO has a chance to run.
const app = createApp(App).use(store);

const init = async () => {
  if (inTeams()) {
    // --- Teams iframe path ---
    // Run SSO FIRST, THEN install the router.
    // By the time beforeEach fires, the teamsToken will already be in Vuex
    // and isAuthChecked will be true (set by SET_USER), so checkAuth is skipped.
    const success = await initializeTeams();
    if (success) {
      try {
        if (!store.getters["auth/isAuthenticated"]) {
          const token = await getTeamsAuthToken();
          await store.dispatch("auth/loginTeamsSSO", token);
        }
      } catch (error) {
        console.error("Teams SSO failed", error);
      }
    }
  } else {
    // --- Normal browser path ---
    // For cookie-based auth, run checkAuth upfront so the router has the
    // correct auth state before beforeEach decides where to send the user.
    await store.dispatch("auth/checkAuth");
  }

  // Install router + mount AFTER auth is resolved.
  // beforeEach will see isAuthChecked=true and skip checkAuth.
  app.use(router).mount("#app");
};

init();
