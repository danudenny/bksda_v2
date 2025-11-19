<template>
  <div class="p-2">
    <!-- Header Section with Greeting -->
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening with your content today.
        </p>
      </div>
      <div class="flex gap-3">
        <NuxtLink to="/admin/posts/create">
          <Button class="bg-primary hover:bg-primary-600 shadow-lg shadow-primary/25">
            <Plus class="w-4 h-4 mr-2" />
            New Post
          </Button>
        </NuxtLink>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="flex items-center justify-center py-20">
      <Loader2 class="w-10 h-10 animate-spin text-primary" />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
      <p class="text-red-600 dark:text-red-400 font-semibold mb-1">Unable to load dashboard</p>
      <p class="text-sm text-red-500/80">{{ error.message }}</p>
      <Button variant="outline" size="sm" class="mt-4 border-red-200 hover:bg-red-100 text-red-600" @click="refresh">
        Try Again
      </Button>
    </div>

    <!-- Dashboard Content -->
    <div v-else-if="data" class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <!-- Quick Stats Row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="(stat, index) in stats" :key="stat.title" 
             class="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md group">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{{ stat.title }}</p>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</h3>
            </div>
            <div :class="`p-2 rounded-lg ${stat.bgClass} ${stat.textClass} group-hover:scale-110 transition-transform duration-300`">
              <component :is="stat.icon" class="w-5 h-5" />
            </div>
          </div>
          <!-- Decorative gradient/shape -->
          <div class="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-5 pointer-events-none" :class="stat.textClass.replace('text-', 'bg-')"></div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left: Activity Chart -->
        <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Top Categories</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">Content distribution across topics</p>
            </div>
            <div class="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <BarChart3 class="w-5 h-5 text-gray-500" />
            </div>
          </div>
          <div class="h-[300px] w-full">
             <Bar :data="data.categoryChartData" :options="barOptions" />
          </div>
        </div>

        <!-- Right: Status Distribution -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Content Status</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Published vs Drafts</p>
          
          <div class="flex-1 flex items-center justify-center relative">
            <div class="h-[220px] w-[220px]">
              <Doughnut :data="data.statusChartData" :options="doughnutOptions" />
            </div>
            <!-- Center text for Doughnut -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
              <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ data.stats.posts }}</span>
              <span class="text-xs text-gray-500 uppercase tracking-wider">Total</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4 text-center">
            <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3">
              <span class="block text-xs text-emerald-600 dark:text-emerald-400 font-medium">Published</span>
              <span class="block text-lg font-bold text-emerald-700 dark:text-emerald-300">{{ data.stats.published }}</span>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <span class="block text-xs text-gray-500 dark:text-gray-400 font-medium">Drafts</span>
              <span class="block text-lg font-bold text-gray-700 dark:text-gray-300">{{ data.stats.draft }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Posts Table -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div class="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Posts</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Latest content updates</p>
          </div>
          <NuxtLink to="/admin/posts" class="text-sm text-primary hover:text-primary-700 font-medium flex items-center">
            View All <ArrowRight class="w-4 h-4 ml-1" />
          </NuxtLink>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead class="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              <tr v-for="post in data.recentPosts" :key="post.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                <td class="px-6 py-4 max-w-[300px]">
                  <NuxtLink :to="`/admin/posts/${post.id}`" class="block">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-primary">{{ post.title }}</p>
                  </NuxtLink>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {{ post.category?.name || 'Uncategorized' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    post.published 
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  ]">
                    <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="post.published ? 'bg-green-500' : 'bg-gray-500'"></span>
                    {{ post.published ? 'Published' : 'Draft' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right text-sm text-gray-500 dark:text-gray-400">
                  {{ new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Bar, Doughnut } from 'vue-chartjs';
import { 
  Chart as ChartJS, 
  Title, 
  Tooltip, 
  Legend, 
  BarElement, 
  CategoryScale, 
  LinearScale,
  ArcElement 
} from 'chart.js';
import { 
  FileText, 
  Layers, 
  Users, 
  Plus, 
  ArrowRight, 
  Loader2,
  BarChart3,
  Eye
} from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

// Register ChartJS components (ArcElement is needed for Doughnut)
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

definePageMeta({
  layout: "admin",
});

const { data, pending, error, refresh } = await useFetch('/api/admin/dashboard', {
  transform: (response) => response.data,
});

// Computed stats for the cards
const stats = computed(() => {
  if (!data.value) return [];
  return [
    { 
      title: 'Total Posts', 
      value: data.value.stats.posts, 
      icon: FileText, 
      bgClass: 'bg-blue-100 dark:bg-blue-900/50',
      textClass: 'text-blue-600 dark:text-blue-400'
    },
    { 
      title: 'Categories', 
      value: data.value.stats.categories, 
      icon: Layers, 
      bgClass: 'bg-indigo-100 dark:bg-indigo-900/50',
      textClass: 'text-indigo-600 dark:text-indigo-400'
    },
    { 
      title: 'Total Users', 
      value: data.value.stats.users, 
      icon: Users, 
      bgClass: 'bg-violet-100 dark:bg-violet-900/50',
      textClass: 'text-violet-600 dark:text-violet-400'
    },
    { 
      title: 'Published', 
      value: `${Math.round((data.value.stats.published / (data.value.stats.posts || 1)) * 100)}%`, 
      icon: BarChart3, 
      bgClass: 'bg-emerald-100 dark:bg-emerald-900/50',
      textClass: 'text-emerald-600 dark:text-emerald-400'
    },
  ];
});

// Configuration for Bar Chart
const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1e293b',
      padding: 12,
      cornerRadius: 8,
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(156, 163, 175, 0.1)', // subtle grid
        drawBorder: false,
      },
      ticks: { precision: 0 },
    },
    x: {
      grid: { display: false },
    }
  },
};

// Configuration for Doughnut Chart
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '75%', // Membuat lubang tengah lebih besar (donat tipis)
  plugins: {
    legend: { display: false }, // Kita pakai custom legend di HTML
    tooltip: {
      backgroundColor: '#1e293b',
      padding: 12,
      cornerRadius: 8,
    }
  },
};
</script>