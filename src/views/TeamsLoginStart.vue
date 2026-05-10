<template>
  <div class="flex items-center justify-center min-h-screen bg-slate-50">
    <p>Redirecting to Microsoft Login...</p>
  </div>
</template>

<script>
import * as microsoftTeams from "@microsoft/teams-js";

export default {
  name: "TeamsLoginStart",
  async mounted() {
    try {
      await microsoftTeams.app.initialize();
      const baseUrl = process.env.VUE_APP_API_URL || "http://localhost:5000/api";
      // Redirect to the backend OAuth endpoint
      window.location.assign(`${baseUrl}/auth/microsoft`);
    } catch (e) {
      console.error("Not in Teams", e);
    }
  }
};
</script>
