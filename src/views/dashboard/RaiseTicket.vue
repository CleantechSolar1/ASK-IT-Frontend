<template>
  <div class="max-w-5xl mx-auto py-6 sm:py-8 px-4">
    <div class="mb-6 sm:mb-8">
      <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800">
        Raise Ticket
      </h2>
      <p class="text-sm sm:text-base text-slate-500 mt-1">
        Submit a new support request and we'll help you resolve it.
      </p>
    </div>

    <div
      class="bg-white p-5 sm:p-8 md:p-10 rounded-3xl sm:rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-slate-100 relative overflow-hidden transition-all duration-300"
    >
      <!-- Decorative background accent -->
      <div
        class="absolute top-[-5%] right-[-5%] w-40 h-40 bg-blue-400/20 rounded-full blur-3xl -z-10 opacity-60"
      ></div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <!-- Name (Auto-filled) -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
            Your Name
          </label>
          <div class="relative group">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              :value="currentUser?.name"
              readonly
              class="bg-slate-100 border border-slate-200 text-slate-500 text-sm rounded-xl block w-full pl-11 p-3.5 cursor-not-allowed"
            />
          </div>
        </div>

        <!-- Email (Auto-filled) -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
            Your Email
          </label>
          <div class="relative group">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              :value="currentUser?.email"
              readonly
              class="bg-slate-100 border border-slate-200 text-slate-500 text-sm rounded-xl block w-full pl-11 p-3.5 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <!-- Category -->
        <div class="mb-5">
          <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
            Category
          </label>

          <div class="relative group">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                ></path>
              </svg>
            </div>
            <select
              v-model="category"
              class="bg-slate-50/50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 block w-full pl-11 p-4 transition-all outline-none appearance-none hover:bg-slate-50"
            >
              <option value="" disabled>Select Category</option>
              <option
                v-for="cat in categories"
                :key="cat._id"
                :value="cat.name"
              >
                {{ cat.name }}
              </option>
            </select>
            <!-- Custom Dropdown Arrow -->
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Department -->
        <div class="mb-5">
          <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
            Department
          </label>

          <div class="relative group">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
            </div>
            <select
              v-model="department"
              class="bg-slate-50/50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 block w-full pl-11 p-4 transition-all outline-none appearance-none hover:bg-slate-50"
            >
              <option value="" disabled>Select Department</option>
              <option v-for="dept in departments" :key="dept" :value="dept">
                {{ dept }}
              </option>
            </select>
            <!-- Custom Dropdown Arrow -->
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Sub-Category (cascading) -->
        <div class="mb-5" v-if="subCategoryOptions.length">
          <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
            Sub-Category
          </label>
          <div class="relative group">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a2 2 0 012-2z"
                ></path>
              </svg>
            </div>
            <select
              v-model="subCategory"
              class="bg-slate-50/50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 block w-full pl-11 p-4 transition-all outline-none appearance-none hover:bg-slate-50"
            >
              <option value="" disabled>Select Sub-Category (optional)</option>
              <option v-for="sub in subCategoryOptions" :key="sub" :value="sub">
                {{ sub }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Country -->
        <div class="mb-5">
          <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
            Country
          </label>

          <div class="relative group">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <select
              v-model="country"
              class="bg-slate-50/50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 block w-full pl-11 p-4 transition-all outline-none appearance-none hover:bg-slate-50"
            >
              <option value="" disabled>Select Country</option>
              <option>India</option>
              <option>Singapore</option>
              <option>Thailand</option>
              <option>Malaysia</option>
              <option>Cambodia</option>
              <option>Indonesia</option>
              <option>Vietnam</option>
            </select>
            <!-- Custom Dropdown Arrow -->
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Priority -->
        <div class="mb-5">
          <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
            Priority
          </label>

          <div class="relative group">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                ></path>
              </svg>
            </div>
            <select
              v-model="priority"
              class="bg-slate-50/50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 block w-full pl-11 p-4 transition-all outline-none appearance-none hover:bg-slate-50"
            >
              <option value="" disabled>Select Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <!-- Custom Dropdown Arrow -->
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="mb-6">
        <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
          Issue Description
        </label>
        <textarea
          v-model="description"
          rows="5"
          placeholder="Please describe your issue in detail..."
          class="bg-slate-50/50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 block w-full p-5 transition-all outline-none resize-y hover:bg-slate-50 leading-relaxed shadow-sm"
        ></textarea>
      </div>

      <!-- Attachments -->
      <div class="mb-8">
        <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
          Attachments (Optional)
        </label>
        <div class="mt-2 flex justify-center rounded-xl border border-dashed border-slate-300 px-6 py-6 hover:bg-slate-50 transition-colors">
          <div class="text-center">
            <svg class="mx-auto h-10 w-10 text-slate-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
            </svg>
            <div class="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
              <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" multiple accept="image/*" class="sr-only" @change="handleFileChange">
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs leading-5 text-slate-500">PNG, JPG, GIF up to 5MB</p>
          </div>
        </div>

        <div v-if="attachments.length > 0" class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          <div v-for="(file, index) in attachments" :key="index" class="relative group aspect-w-10 aspect-h-7 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center p-2 border border-slate-200">
            <span class="text-xs font-medium text-slate-600 truncate px-2 text-center">{{ file.name }}</span>
            <button @click="removeAttachment(index)" type="button" class="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="mb-6 bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-200 shadow-sm relative overflow-hidden"
      >
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
        <div class="bg-emerald-100 rounded-full p-1 text-emerald-600">
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <p class="text-emerald-700 text-sm font-semibold">
          {{ successMessage }}
        </p>
      </div>

      <!-- Submit Button -->
      <button
        @click="submitTicket"
        :disabled="
          !category ||
          !priority ||
          !description ||
          !department ||
          !country ||
          loading
        "
        class="relative w-full sm:w-auto sm:min-w-[200px] overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl px-6 py-4 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_12px_24px_rgba(37,99,235,0.25)] hover:-translate-y-0.5 before:absolute before:inset-0 before:bg-white/20 before:translate-x-full hover:before:animate-[shimmer_1s] flex items-center justify-center gap-2"
      >
        <svg
          v-if="loading"
          class="animate-spin h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <svg
          v-else
          class="w-5 h-5 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
        <span>{{ loading ? "Submitting..." : "Submit Ticket" }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      category: "",
      subCategory: "",
      department: "",
      priority: "",
      country: "",
      description: "",
      attachments: [],
      successMessage: "",
      loading: false,
      departments: [
        "IT",
        "FINANCE",
        "PROCUREMENT",
        "PROJECT MANAGEMENT",
        "INFRASTRUCTURE AND DEVELOPMENT",
        "OPERATIONS AND MAINTENANCE",
        "LEGAL",
        "CORPORATE",
        "RISK MANAGEMENT",
        "HR and Administration",
        "Wind",
      ],
    };
  },

  computed: {
    ...mapGetters("categories", ["categories"]),
    ...mapGetters("auth", ["currentUser"]),

    subCategoryOptions() {
      const map = {
        "Hardware Issue": [
          "Accessories",
          "Laptop",
          "Monitor",
          "Printer",
          "Wireless Mouse / Keyboard",
          "Others",
        ],
        Salesforce: [
          "Invoice Generation Issues",
          "Login Issues",
          "Access Request",
          "Others",
        ],
        SharePoint: [
          "Access Request",
          "Access Granting",
          "Revoking Access",
          "Guest ID Whitelisting",
          "Creating a Site",
          "Login Issues",
          "Others",
        ],
        "Business Central": ["Login Issues", "Access Request", "Others"],
        Application: [
          "App Installation",
          "Foxit License Requirement",
          "Outlook Issue",
          "Adobe Not Working",
          "Others",
        ],
        VPN: ["ID Creation", "Tunnel Creation", "Others"],
        "System Issue": [
          "Device Slow",
          "Laptop Not Powering On",
          "Battery Not Charging / Draining Fast",
          "Broken or Flickering Screen",
          "Keyboard / Touchpad Not Working",
          "USB / HDMI Port Not Working",
          "Audio Not Working",
          "Camera Not Working",
          "Others",
        ],
        "Power BI": [
          "Dashboard refresh request",
          "License request",
          "New reports creation request",
          "Old report changes request",
          "Others",
        ],
      };
      return map[this.category] || [];
    },
  },

  mounted() {
    this.fetchCategories();
  },

  watch: {
    category() {
      this.subCategory = "";
    },
  },

  methods: {
    ...mapActions("ticket", ["createTicket"]),
    ...mapActions("categories", ["fetchCategories"]),

    handleFileChange(event) {
      const files = Array.from(event.target.files);
      // Optional: limit to 5 files or validate types
      if (this.attachments.length + files.length > 5) {
        alert("Maximum 5 attachments allowed.");
        return;
      }
      this.attachments.push(...files);
    },

    removeAttachment(index) {
      this.attachments.splice(index, 1);
    },

    async submitTicket() {
      this.loading = true;

      const formData = new FormData();
      formData.append("category", this.category);
      if (this.subCategory) {
        formData.append("subCategory", this.subCategory);
      }
      formData.append("department", this.department);
      formData.append("priority", this.priority);
      formData.append("description", this.description);
      formData.append("country", this.country);
      formData.append("userEmail", this.currentUser?.email || "");

      for (const file of this.attachments) {
        formData.append("attachments", file);
      }

      await this.createTicket(formData);
      
      this.loading = false;
      this.successMessage = "Ticket created successfully";

      // reset form
      this.category = "";
      this.subCategory = "";
      this.department = "";
      this.priority = "";
      this.country = "";
      this.description = "";
      this.attachments = [];

      this.$router.push("/my-tickets");
    },
  },
};
</script>
