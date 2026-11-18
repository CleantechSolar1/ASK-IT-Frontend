<template>
  <section aria-labelledby="email-routing-title">
    <header class="mb-6">
      <h1 id="email-routing-title" class="text-3xl font-bold tracking-tight text-slate-800">
        Email Routing
      </h1>
      <p class="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
        Choose the specialist assigned and notified for each new ticket by category and priority.
        Leave a recipient blank to send the ticket to IT Support only.
      </p>
    </header>

    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <p v-if="loading" role="status" class="p-6 text-sm text-slate-600">
        Loading email routing…
      </p>
      <div v-else-if="loadError" class="flex flex-wrap items-center gap-3 p-6">
        <p role="alert" class="text-sm text-red-700">{{ loadError }}</p>
        <button type="button" class="text-sm font-semibold text-blue-700 hover:underline" @click="loadRoutes">
          Try again
        </button>
      </div>
      <template v-else>
        <div
          aria-hidden="true"
          class="routing-grid hidden border-b border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-600 xl:grid"
        >
          <span>Category</span>
          <div class="grid grid-cols-3 gap-3">
            <span v-for="priority in priorities" :key="priority.key">{{ priority.label }}</span>
          </div>
        </div>
        <ul class="divide-y divide-slate-100">
          <li v-for="(row, index) in rows" :key="row.key" class="px-4 py-4 sm:px-6">
            <form :aria-labelledby="`routing-category-${index}`" @submit.prevent="saveRoute(row)">
              <div class="routing-grid grid items-center gap-3">
                <h2 :id="`routing-category-${index}`" class="text-sm font-semibold text-slate-800">
                  {{ row.category }}
                </h2>
                <div class="grid gap-3 sm:grid-cols-3">
                  <label v-for="priority in priorities" :key="priority.key" class="block min-w-0">
                    <span class="mb-1.5 block text-sm font-medium text-slate-600 xl:sr-only">
                      {{ priority.label }}
                    </span>
                    <input
                      v-model="row.recipients[priority.key]"
                      type="email"
                      autocomplete="off"
                      spellcheck="false"
                      maxlength="254"
                      placeholder="IT Support only"
                      :disabled="row.saving"
                      class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
                      @input="clearFeedback(row)"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  :disabled="row.saving || !hasChanges(row)"
                  class="justify-self-start rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 xl:w-full"
                >
                  {{ row.saving ? "Saving…" : "Save" }}
                </button>
              </div>
              <div aria-live="polite">
                <p v-if="row.error" class="mt-2 text-sm text-red-700">{{ row.error }}</p>
                <p v-else-if="row.saved" class="mt-2 text-sm text-emerald-700">Routing saved.</p>
              </div>
            </form>
          </li>
        </ul>
      </template>
    </div>
  </section>
</template>

<script>
import { getEmailRoutingApi, updateEmailRoutingApi } from "@/api/modules/emailRouting";

export default {
  name: "EmailRouting",

  data() {
    return {
      priorities: [
        { key: "low", label: "Low" },
        { key: "medium", label: "Medium" },
        { key: "high", label: "High" },
      ],
      rows: [],
      loading: true,
      loadError: "",
    };
  },

  created() {
    this.loadRoutes();
  },

  methods: {
    async loadRoutes() {
      this.loading = true;
      this.loadError = "";
      try {
        const { data } = await getEmailRoutingApi();
        this.rows = data.data.map(({ key, category, recipients }) => ({
          key,
          category,
          recipients: { ...recipients },
          original: { ...recipients },
          saving: false,
          saved: false,
          error: "",
        }));
      } catch (error) {
        this.loadError = error.response?.data?.message || "Could not load email routing.";
      } finally {
        this.loading = false;
      }
    },

    changedRecipients(row) {
      const changes = {};
      for (const { key } of this.priorities) {
        const email = row.recipients[key]?.trim() || null;
        if (email !== row.original[key]) changes[key] = email;
      }
      return changes;
    },

    hasChanges(row) {
      return Object.keys(this.changedRecipients(row)).length > 0;
    },

    clearFeedback(row) {
      row.error = "";
      row.saved = false;
    },

    async saveRoute(row) {
      if (row.saving) return;
      const changes = this.changedRecipients(row);
      if (!Object.keys(changes).length) return;

      row.saving = true;
      this.clearFeedback(row);
      try {
        const { data } = await updateEmailRoutingApi(row.key, changes);
        const recipients = data.data.recipients;
        row.recipients = { ...recipients };
        row.original = { ...recipients };
        row.saved = true;
      } catch (error) {
        row.error = error.response?.data?.message || "Could not save email routing.";
      } finally {
        row.saving = false;
      }
    },
  },
};
</script>

<style scoped>
@media (min-width: 1280px) {
  .routing-grid {
    grid-template-columns: minmax(8rem, 1fr) minmax(0, 4fr) 5rem;
    column-gap: 0.75rem;
  }
}
</style>
