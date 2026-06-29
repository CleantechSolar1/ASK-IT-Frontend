<template>
  <div class="space-y-6">
    <!-- Filters -->
    <div class="flex flex-col lg:flex-row gap-4 mb-6">
      <!-- Search -->
      <div class="relative group flex-1">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          v-model="search"
          placeholder="Search by Ticket ID or Username..."
          class="bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full pl-11 p-2.5 transition-all outline-none shadow-sm"
        />
      </div>

      <!-- Filter Controls Grid -->
      <div class="grid grid-cols-2 md:flex md:flex-wrap gap-3 sm:gap-4 w-full lg:w-auto">

        <!-- Status Multiselect -->
        <div class="relative" ref="statusDropdown">
          <button
            @click.stop="toggleDropdown('status')"
            class="bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 flex items-center justify-between w-full md:w-36 px-3 py-2.5 transition-all outline-none shadow-sm font-medium gap-2"
            :class="{ 'border-blue-400 ring-4 ring-blue-500/10': activeDropdown === 'status' }"
          >
            <span class="truncate">{{ statusLabel }}</span>
            <svg class="w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200" :class="{ 'rotate-180': activeDropdown === 'status' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <transition name="dropdown">
            <div
              v-if="activeDropdown === 'status'"
              @click.stop
              class="absolute top-full left-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden"
            >
              <div class="p-1.5">
                <label v-for="opt in statusOptions" :key="opt.value" class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors">
                  <input
                    type="checkbox"
                    :value="opt.value"
                    v-model="statusFilter"
                    @change="page = 1"
                    class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer"
                  />
                  <span class="text-sm text-slate-700 font-medium group-hover:text-slate-900">{{ opt.label }}</span>
                </label>
              </div>
              <div v-if="statusFilter.length > 0" class="border-t border-slate-100 px-3 py-2">
                <button @click="statusFilter = []; page = 1" class="text-xs text-blue-600 hover:text-blue-800 font-semibold">Clear</button>
              </div>
            </div>
          </transition>
        </div>

        <!-- Priority Multiselect -->
        <div class="relative" ref="priorityDropdown">
          <button
            @click.stop="toggleDropdown('priority')"
            class="bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 flex items-center justify-between w-full md:w-36 px-3 py-2.5 transition-all outline-none shadow-sm font-medium gap-2"
            :class="{ 'border-blue-400 ring-4 ring-blue-500/10': activeDropdown === 'priority' }"
          >
            <span class="truncate">{{ priorityLabel }}</span>
            <svg class="w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200" :class="{ 'rotate-180': activeDropdown === 'priority' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <transition name="dropdown">
            <div
              v-if="activeDropdown === 'priority'"
              @click.stop
              class="absolute top-full left-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden"
            >
              <div class="p-1.5">
                <label v-for="opt in priorityOptions" :key="opt" class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors">
                  <input
                    type="checkbox"
                    :value="opt"
                    v-model="priorityFilter"
                    @change="page = 1"
                    class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer"
                  />
                  <span class="text-sm text-slate-700 font-medium group-hover:text-slate-900">{{ opt }}</span>
                </label>
              </div>
              <div v-if="priorityFilter.length > 0" class="border-t border-slate-100 px-3 py-2">
                <button @click="priorityFilter = []; page = 1" class="text-xs text-blue-600 hover:text-blue-800 font-semibold">Clear</button>
              </div>
            </div>
          </transition>
        </div>

        <!-- Department Multiselect -->
        <div class="relative col-span-2 md:col-auto" ref="departmentDropdown">
          <button
            @click.stop="toggleDropdown('department')"
            class="bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 flex items-center justify-between w-full md:w-44 px-3 py-2.5 transition-all outline-none shadow-sm font-medium gap-2"
            :class="{ 'border-blue-400 ring-4 ring-blue-500/10': activeDropdown === 'department' }"
          >
            <span class="truncate">{{ departmentLabel }}</span>
            <svg class="w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200" :class="{ 'rotate-180': activeDropdown === 'department' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <transition name="dropdown">
            <div
              v-if="activeDropdown === 'department'"
              @click.stop
              class="absolute top-full left-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden"
            >
              <div class="p-1.5 max-h-60 overflow-y-auto">
                <label v-for="dept in departments" :key="dept" class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors">
                  <input
                    type="checkbox"
                    :value="dept"
                    v-model="departmentFilter"
                    @change="page = 1"
                    class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer"
                  />
                  <span class="text-sm text-slate-700 font-medium group-hover:text-slate-900">{{ dept }}</span>
                </label>
              </div>
              <div v-if="departmentFilter.length > 0" class="border-t border-slate-100 px-3 py-2">
                <button @click="departmentFilter = []; page = 1" class="text-xs text-blue-600 hover:text-blue-800 font-semibold">Clear</button>
              </div>
            </div>
          </transition>
        </div>

        <!-- Assigned To Multiselect -->
        <div class="relative col-span-2 md:col-auto" ref="assignedDropdown">
          <button
            @click.stop="toggleDropdown('assigned')"
            class="bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 flex items-center justify-between w-full md:w-44 px-3 py-2.5 transition-all outline-none shadow-sm font-medium gap-2"
            :class="{ 'border-blue-400 ring-4 ring-blue-500/10': activeDropdown === 'assigned' }"
          >
            <span class="truncate">{{ assignedLabel }}</span>
            <svg class="w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200" :class="{ 'rotate-180': activeDropdown === 'assigned' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <transition name="dropdown">
            <div
              v-if="activeDropdown === 'assigned'"
              @click.stop
              class="absolute top-full left-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden"
            >
              <div class="p-1.5 max-h-60 overflow-y-auto">
                <label v-for="admin in allAdmins" :key="admin.email" class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors">
                  <input
                    type="checkbox"
                    :value="admin.email"
                    v-model="assignedToFilter"
                    @change="page = 1"
                    class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer"
                  />
                  <span class="text-sm text-slate-700 font-medium group-hover:text-slate-900 truncate">{{ admin.name || admin.email }}</span>
                </label>
              </div>
              <div v-if="assignedToFilter.length > 0" class="border-t border-slate-100 px-3 py-2">
                <button @click="assignedToFilter = []; page = 1" class="text-xs text-blue-600 hover:text-blue-800 font-semibold">Clear</button>
              </div>
            </div>
          </transition>
        </div>

        <!-- Export Button -->
        <button
          @click="showExportOptions"
          class="col-span-2 md:col-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-[0_4px_15px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] transition-all duration-300 transform active:scale-95 group"
        >
          <svg class="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Export CSV
        </button>
      </div>
    </div>

    <!-- Date Range Filter -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-1">
      <div class="flex items-center gap-2 text-slate-500">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <span class="text-xs font-semibold uppercase tracking-wider">Date Range</span>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <div class="relative">
          <input
            v-model="startDateFilter"
            @change="page = 1"
            type="date"
            placeholder="Start date"
            class="bg-white border border-slate-200 text-slate-700 text-xs rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 px-3 py-2 transition-all outline-none shadow-sm font-medium pr-3"
          />
        </div>
        <span class="text-slate-400 text-xs font-bold">→</span>
        <div class="relative">
          <input
            v-model="endDateFilter"
            @change="page = 1"
            type="date"
            :min="startDateFilter"
            placeholder="End date"
            class="bg-white border border-slate-200 text-slate-700 text-xs rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 px-3 py-2 transition-all outline-none shadow-sm font-medium pr-3"
          />
        </div>
        <button
          v-if="startDateFilter || endDateFilter"
          @click="startDateFilter = ''; endDateFilter = ''; page = 1"
          class="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 bg-slate-100 hover:bg-red-50 border border-slate-200 hover:border-red-200 px-2.5 py-2 rounded-lg transition-all font-medium"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          Clear dates
        </button>
        <!-- Active filter count badge -->
        <span
          v-if="activeFilterCount > 0"
          class="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-lg font-semibold"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"></path>
          </svg>
          {{ activeFilterCount }} filter{{ activeFilterCount > 1 ? 's' : '' }} active
          <button @click="clearAllFilters" class="ml-1 hover:text-red-600 transition-colors">✕</button>
        </span>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left whitespace-nowrap">
          <thead class="text-xs text-slate-500 bg-slate-50/80 uppercase font-semibold border-b border-slate-100">
            <tr>
              <th scope="col" class="px-6 py-4 tracking-wider">Ticket ID</th>
              <th scope="col" class="px-6 py-4 tracking-wider">Created</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-center">Action</th>
              <th scope="col" class="px-6 py-4 tracking-wider">Raised By</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-center">Assigned To</th>
              <th scope="col" class="px-6 py-4 tracking-wider">Category</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-center">Priority</th>
              <th scope="col" class="px-6 py-4 tracking-wider">Department</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-center">Status</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-center">Update Status</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-center">Delegate</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100/60 bg-transparent">
            <tr
              v-for="ticket in paginatedTickets"
              :key="ticket._id"
              class="bg-white hover:bg-slate-50/60 transition-all duration-300 group hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-[1px]"
            >
              <td class="px-6 py-4 border-l-4 border-transparent group-hover:border-blue-500 transition-colors">
                <span class="font-mono font-bold text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-lg text-[11px] tracking-wider">{{ ticket.ticketId }}</span>
              </td>

              <td class="px-6 py-4 text-slate-500 font-medium">
                {{ formatDate(ticket.createdAt) }}
              </td>

              <td class="px-6 py-4 text-center">
                <button
                  @click="openTicket(ticket)"
                  title="View Details"
                  class="p-2 rounded-xl bg-slate-50 text-slate-500 border border-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm flex inline-flex items-center justify-center transform active:scale-95 mx-auto"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </button>
              </td>

              <td class="px-6 py-4">
                <span class="font-semibold text-slate-700">{{ ticket.userId?.name || "Unknown" }}</span>
              </td>

              <td class="px-6 py-4 text-center">
                <span class="text-slate-600 font-medium">{{ ticket.assignedToName || "Unassigned" }}</span>
              </td>

              <td class="px-6 py-4">
                <span class="font-semibold text-slate-800">{{ ticket.category }}</span>
              </td>

              <td class="px-6 py-4 text-center">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border" :class="priorityClass(ticket.priority)">
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="priorityDotClass(ticket.priority)"></span>
                  {{ ticket.priority }}
                </span>
              </td>

              <td class="px-6 py-4">
                <span class="font-semibold text-slate-700">{{ ticket.department || "N/A" }}</span>
              </td>

              <td class="px-6 py-4 text-center">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border" :class="statusClass(ticket.status)">
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="statusDotClass(ticket.status)"></span>
                  {{ ticket.status }}
                </span>
              </td>

              <td class="px-6 py-4 text-center">
                <select
                  @change="updateStatus(ticket, $event)"
                  :value="ticket.status"
                  class="bg-slate-50 border border-slate-200/60 text-slate-700 text-xs rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 p-2 transition-all outline-none font-semibold text-center hover:bg-white cursor-pointer shadow-sm appearance-none pr-8 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_10px_center] bg-no-repeat"
                >
                  <option disabled value="">Change</option>
                  <option value="Received">Received</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>

              <td class="px-6 py-4 text-center">
                <select
                  @change="handleDelegate(ticket, $event)"
                  :value="ticket.assignedToEmail || ''"
                  class="bg-slate-50 border border-slate-200/60 text-slate-700 text-xs rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 p-2 transition-all outline-none font-semibold hover:bg-white cursor-pointer max-w-[130px] shadow-sm appearance-none pr-8 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_10px_center] bg-no-repeat"
                >
                  <option disabled value="">Assign To...</option>
                  <option v-for="admin in allAdmins" :key="admin.email" :value="admin.email">
                    {{ admin.name || admin.email }}
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div
        v-if="!paginatedTickets || paginatedTickets.length === 0"
        class="py-12 flex flex-col items-center justify-center text-center"
      >
        <div class="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-3">
          <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h3 class="text-sm font-semibold text-slate-800">No tickets found</h3>
        <p class="text-slate-500 text-xs mt-1">Try adjusting your search or filters.</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
      <div class="flex-1 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p class="text-sm text-slate-700 font-medium">
            Page <span class="font-bold text-slate-900">{{ page }}</span> of
            <span class="font-bold text-slate-900">{{ totalPages }}</span>
            <span class="text-slate-400 ml-2">({{ filteredTickets.length }} results)</span>
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px gap-2" aria-label="Pagination">
            <button
              @click="prevPage"
              :disabled="page === 1"
              class="relative inline-flex items-center px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-50 focus:z-10 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 shadow-sm"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="page >= totalPages"
              class="relative inline-flex items-center px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-50 focus:z-10 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 shadow-sm"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <ticketModal
      :show="showModal"
      :ticket="selectedTicket"
      :can-comment="true"
      :is-submitting-comment="isSubmittingComment"
      @add-comment="handleAddComment"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
import ticketModal from "@/components/common/ticketModal.vue";

export default {
  props: {
    tickets: Array,
    initialStatus: {
      type: String,
      default: "",
    },
  },

  components: {
    ticketModal,
  },

  data() {
    return {
      search: "",
      // Multiselect arrays
      statusFilter: this.initialStatus ? [this.initialStatus] : [],
      priorityFilter: [],
      departmentFilter: [],
      assignedToFilter: [],
      // Date range
      startDateFilter: "",
      endDateFilter: "",
      // Dropdown state
      activeDropdown: null,
      page: 1,
      perPage: 20,
      showModal: false,
      selectedTicket: {},
      isSubmittingComment: false,
      // Options
      statusOptions: [
        { value: "Open", label: "Open Tickets" },
        { value: "Received", label: "Received" },
        { value: "In Progress", label: "In Progress" },
        { value: "Pending", label: "Pending" },
        { value: "Completed", label: "Completed" },
      ],
      priorityOptions: ["Low", "Medium", "High"],
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
        "Business Development",
      ],
    };
  },

  computed: {
    ...mapGetters("subAdmin", ["subAdmins"]),
    ...mapGetters("auth", ["currentUser"]),

    allAdmins() {
      const list = [...this.subAdmins];
      if (this.currentUser && !list.find((a) => a.email === this.currentUser.email)) {
        list.unshift({
          email: this.currentUser.email,
          name: this.currentUser.name || "Primary Admin",
        });
      }
      return list;
    },

    // --- Dynamic labels for multiselect buttons ---
    statusLabel() {
      if (this.statusFilter.length === 0) return "All Status";
      if (this.statusFilter.length === 1) {
        const opt = this.statusOptions.find((o) => o.value === this.statusFilter[0]);
        return opt ? opt.label : this.statusFilter[0];
      }
      return `Status (${this.statusFilter.length})`;
    },

    priorityLabel() {
      if (this.priorityFilter.length === 0) return "All Priorities";
      if (this.priorityFilter.length === 1) return this.priorityFilter[0];
      return `Priority (${this.priorityFilter.length})`;
    },

    departmentLabel() {
      if (this.departmentFilter.length === 0) return "All Departments";
      if (this.departmentFilter.length === 1) return this.departmentFilter[0];
      return `Dept (${this.departmentFilter.length})`;
    },

    assignedLabel() {
      if (this.assignedToFilter.length === 0) return "All Assigned";
      if (this.assignedToFilter.length === 1) {
        const admin = this.allAdmins.find((a) => a.email === this.assignedToFilter[0]);
        return admin ? (admin.name || admin.email) : this.assignedToFilter[0];
      }
      return `Assigned (${this.assignedToFilter.length})`;
    },

    // Count active filters for the badge
    activeFilterCount() {
      let count = 0;
      if (this.statusFilter.length > 0) count++;
      if (this.priorityFilter.length > 0) count++;
      if (this.departmentFilter.length > 0) count++;
      if (this.assignedToFilter.length > 0) count++;
      if (this.startDateFilter || this.endDateFilter) count++;
      return count;
    },

    filteredTickets() {
      return this.tickets.filter((ticket) => {
        const searchTerm = this.search.toLowerCase();
        const matchSearch =
          ticket.ticketId.toLowerCase().includes(searchTerm) ||
          (ticket.userId?.name || "").toLowerCase().includes(searchTerm);

        // Multi-select status: empty array = all; "Open" means not Completed
        const matchStatus =
          this.statusFilter.length === 0 ||
          this.statusFilter.some((s) =>
            s === "Open"
              ? ticket.status !== "Completed"
              : ticket.status === s
          );

        // Multi-select priority
        const matchPriority =
          this.priorityFilter.length === 0 ||
          this.priorityFilter.includes(ticket.priority);

        // Multi-select department
        const matchDepartment =
          this.departmentFilter.length === 0 ||
          this.departmentFilter.includes(ticket.department);

        // Multi-select assigned to
        const matchAssignedTo =
          this.assignedToFilter.length === 0 ||
          this.assignedToFilter.includes(ticket.assignedToEmail);

        // Date range filter
        let matchDate = true;
        if (this.startDateFilter || this.endDateFilter) {
          const ticketDate = ticket.createdAt ? new Date(ticket.createdAt) : null;
          if (!ticketDate) {
            matchDate = false;
          } else {
            if (this.startDateFilter) {
              const start = new Date(this.startDateFilter);
              start.setHours(0, 0, 0, 0);
              if (ticketDate < start) matchDate = false;
            }
            if (this.endDateFilter) {
              const end = new Date(this.endDateFilter);
              end.setHours(23, 59, 59, 999);
              if (ticketDate > end) matchDate = false;
            }
          }
        }

        return matchSearch && matchStatus && matchPriority && matchDepartment && matchAssignedTo && matchDate;
      });
    },

    totalPages() {
      return Math.ceil(this.filteredTickets.length / this.perPage) || 1;
    },

    paginatedTickets() {
      const start = (this.page - 1) * this.perPage;
      return this.filteredTickets.slice(start, start + this.perPage);
    },
  },

  watch: {
    initialStatus(newVal) {
      this.statusFilter = newVal ? [newVal] : [];
      this.page = 1;
    },
    // Reset page when filters change
    statusFilter() { this.page = 1; },
    priorityFilter() { this.page = 1; },
    departmentFilter() { this.page = 1; },
    assignedToFilter() { this.page = 1; },
    startDateFilter() { this.page = 1; },
    endDateFilter() { this.page = 1; },
  },

  mounted() {
    this.fetchSubAdmins();
    this._closeDropdownHandler = () => { this.activeDropdown = null; };
    document.addEventListener("click", this._closeDropdownHandler);
  },

  unmounted() {
    document.removeEventListener("click", this._closeDropdownHandler);
  },

  methods: {
    ...mapActions("ticket", ["updateTicketStatus", "delegateTicket", "addTicketComment"]),
    ...mapActions("subAdmin", ["fetchSubAdmins"]),

    toggleDropdown(name) {
      this.activeDropdown = this.activeDropdown === name ? null : name;
    },

    clearAllFilters() {
      this.statusFilter = [];
      this.priorityFilter = [];
      this.departmentFilter = [];
      this.assignedToFilter = [];
      this.startDateFilter = "";
      this.endDateFilter = "";
      this.search = "";
      this.page = 1;
    },

    async handleDelegate(ticket, event) {
      if (!event.target.value) return;
      const adminName = event.target.options[event.target.selectedIndex].text;
      const result = await Swal.fire({
        title: "Delegate Ticket?",
        text: `Are you sure you want to delegate this ticket to ${adminName}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#2563EB",
        cancelButtonColor: "#94A3B8",
        confirmButtonText: "Yes, delegate it!",
      });
      if (!result.isConfirmed) {
        event.target.value = ticket.assignedToEmail || "";
        return;
      }
      try {
        await this.delegateTicket({ ticketId: ticket._id, email: event.target.value });
        Swal.fire({
          title: "Delegated!",
          text: `Ticket successfully assigned to ${adminName}.`,
          icon: "success",
          confirmButtonColor: "#10B981",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({ title: "Error!", text: "Failed to delegate ticket.", icon: "error", confirmButtonColor: "#EF4444" });
        event.target.value = ticket.assignedToEmail || "";
      }
    },

    updateStatus(ticket, event) {
      if (!event.target.value) return;
      this.updateTicketStatus({ ticketId: ticket._id, status: event.target.value });
    },

    priorityClass(priority) {
      if (priority === "High" || priority === "Critical") return "bg-red-50 text-red-700 border-red-200";
      if (priority === "Medium") return "bg-amber-50 text-amber-700 border-amber-200";
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    },

    priorityDotClass(priority) {
      if (priority === "High" || priority === "Critical") return "bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.5)]";
      if (priority === "Medium") return "bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.5)]";
      return "bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]";
    },

    statusClass(status) {
      if (status === "Received") return "bg-slate-50 text-slate-700 border-slate-200";
      if (status === "In Progress") return "bg-blue-50 text-blue-700 border-blue-200";
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    },

    statusDotClass(status) {
      if (status === "Received") return "bg-slate-500 shadow-[0_0_4px_rgba(100,116,139,0.5)]";
      if (status === "In Progress") return "bg-blue-500 shadow-[0_0_4px_rgba(59,130,246,0.5)]";
      return "bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]";
    },

    formatDate(date) {
      if (!date) return "N/A";
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },

    nextPage() { if (this.page < this.totalPages) this.page++; },
    prevPage() { if (this.page > 1) this.page--; },

    openTicket(ticket) {
      this.selectedTicket = ticket;
      this.showModal = true;
    },

    async handleAddComment(comment) {
      if (!this.selectedTicket?._id) return;

      this.isSubmittingComment = true;
      try {
        const updatedTicket = await this.addTicketComment({
          ticketId: this.selectedTicket._id,
          comment,
        });
        this.selectedTicket = updatedTicket;
        Swal.fire({
          title: "Comment Added",
          text: "The user can now see this comment on the ticket.",
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Could not add comment",
          text: error.response?.data?.message || "Please try again.",
          icon: "error",
          confirmButtonColor: "#EF4444",
        });
      } finally {
        this.isSubmittingComment = false;
      }
    },

    async showExportOptions() {
      const { value: exportType } = await Swal.fire({
        title: "Export Tickets",
        text: "Select a range for the CSV export",
        icon: "info",
        input: "select",
        inputOptions: {
          this_month: "This Month",
          last_month: "Last Month",
          last_3_months: "Last 3 Months",
          manual: "Manual Date Range",
        },
        inputPlaceholder: "Select export range",
        showCancelButton: true,
        confirmButtonColor: "#2563EB",
        cancelButtonColor: "#94A3B8",
        confirmButtonText: "Continue",
      });

      if (!exportType) return;

      let startDate, endDate;
      const now = new Date();

      if (exportType === "this_month") {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      } else if (exportType === "last_month") {
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
      } else if (exportType === "last_3_months") {
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        endDate = now;
      } else if (exportType === "manual") {
        const { value: formValues } = await Swal.fire({
          title: "Select Date Range",
          html:
            '<div class="flex flex-col gap-4 text-left p-2">' +
            '<label class="text-sm font-medium text-slate-700">Start Date</label>' +
            '<input id="swal-input1" type="date" class="swal2-input !mt-0 !w-full !mx-0 rounded-xl border-slate-200">' +
            '<label class="text-sm font-medium text-slate-700">End Date</label>' +
            '<input id="swal-input2" type="date" class="swal2-input !mt-0 !w-full !mx-0 rounded-xl border-slate-200">' +
            "</div>",
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonColor: "#2563EB",
          cancelButtonColor: "#94A3B8",
          preConfirm: () => {
            return [
              document.getElementById("swal-input1").value,
              document.getElementById("swal-input2").value,
            ];
          },
        });

        if (formValues) {
          [startDate, endDate] = formValues;
          if (!startDate || !endDate) {
            Swal.fire("Error", "Please select both start and end dates", "error");
            return;
          }
          if (startDate === endDate) {
            Swal.fire("Invalid Range", "Start and End dates cannot be the same.", "warning");
            return;
          }
          if (new Date(startDate) > new Date(endDate)) {
            Swal.fire("Invalid Range", "Start date cannot be after the end date.", "warning");
            return;
          }
        } else {
          return;
        }
      }

      this.executeExport(startDate, endDate);
    },

    async executeExport(start, end) {
      try {
        Swal.fire({
          title: "Generating CSV...",
          text: "Please wait while we prepare your data.",
          allowOutsideClick: false,
          didOpen: () => { Swal.showLoading(); },
        });

        const startStr = start instanceof Date ? start.toISOString() : new Date(start).toISOString();
        let endStr;
        if (end instanceof Date) {
          endStr = end.toISOString();
        } else {
          const endWithTime = new Date(end);
          endWithTime.setHours(23, 59, 59, 999);
          endStr = endWithTime.toISOString();
        }

        // Build filter params from active multiselect filters
        const params = { startDate: startStr, endDate: endStr };
        if (this.statusFilter.length > 0) params.status = this.statusFilter.join(",");
        if (this.priorityFilter.length > 0) params.priority = this.priorityFilter.join(",");
        if (this.departmentFilter.length > 0) params.department = this.departmentFilter.join(",");
        if (this.assignedToFilter.length > 0) params.assignedTo = this.assignedToFilter.join(",");

        const api = (await import("@/api/axios")).default;
        const response = await api.get("/tickets/admin/export", {
          params,
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `tickets_export_${new Date().toISOString().split("T")[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        Swal.close();
        Swal.fire({
          title: "Success!",
          text: "CSV export has been downloaded.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Export Failed",
          text: error.response?.data?.message || "Something went wrong while exporting.",
          icon: "error",
          confirmButtonColor: "#EF4444",
        });
      }
    },
  },
};
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
</style>
