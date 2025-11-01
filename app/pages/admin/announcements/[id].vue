<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Save,
  Loader,
  Calendar as CalendarIcon,
} from "lucide-vue-next";
import { useApi } from "@/composables/useApi";
import { toast } from "vue-sonner";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  DateFormatter,
  getLocalTimeZone,
  today,
  type DateValue,
  parseDate,
} from "@internationalized/date";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const route = useRoute();
const { getAnnouncement, createAnnouncement, updateAnnouncement, loading } =
  useApi();

// State
const isSaving = ref(false);
const isNew = computed(() => route.params.id === "create");

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const form = ref({
  title: "",
  date: today(getLocalTimeZone()) as DateValue,
  category: "",
  href: "",
  order: 0,
  isActive: true,
});

const errors = ref<Record<string, string>>({});

// Helper function to parse date from various formats
function parseDateString(dateStr: string): DateValue {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return parseDate(dateStr);
  }

  const monthMap: Record<string, string> = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    Mei: "05",
    Jun: "06",
    Jul: "07",
    Agu: "08",
    Sep: "09",
    Okt: "10",
    Nov: "11",
    Des: "12",
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  const match = dateStr.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/);
  if (match) {
    const [, day, month, year] = match;
    const monthNum = monthMap[month];
    if (monthNum) {
      const isoDate = `${year}-${monthNum}-${day.padStart(2, "0")}`;
      return parseDate(isoDate);
    }
  }

  console.warn(`Could not parse date: ${dateStr}, using today instead`);
  return today(getLocalTimeZone());
}

// Methods
async function fetchAnnouncement() {
  if (isNew.value) return;

  try {
    const response = await getAnnouncement(route.params.id as string);

    if (response.success) {
      form.value = {
        ...response.data,
        date: parseDateString(response.data.date),
      };
    } else {
      toast.error(response.message || "Failed to load announcement");
      router.push("/admin/announcements");
    }
  } catch (error) {
    console.error("Failed to fetch announcement:", error);
    toast.error("Failed to load announcement");
    router.push("/admin/announcements");
  }
}

function validateForm(): boolean {
  errors.value = {};
  if (!form.value.title.trim()) errors.value.title = "Title is required";
  if (!form.value.date) errors.value.date = "Date is required";
  if (!form.value.category.trim())
    errors.value.category = "Category is required";
  if (!form.value.href.trim()) errors.value.href = "Link is required";
  return Object.keys(errors.value).length === 0;
}

async function saveAnnouncement() {
  if (!validateForm()) return;

  isSaving.value = true;
  try {
    const payload = {
      ...form.value,
      date: form.value.date.toString(),
    };

    let response;
    if (isNew.value) {
      response = await createAnnouncement(payload);
    } else {
      response = await updateAnnouncement(route.params.id as string, payload);
    }

    if (response.success) {
      toast.success(
        isNew.value
          ? "Announcement created successfully"
          : "Announcement updated successfully",
      );
      router.push("/admin/announcements");
    } else {
      toast.error(response.message || "Failed to save announcement");
    }
  } catch (error: any) {
    console.error("Failed to save announcement:", error);
    toast.error(error.message || "Failed to save announcement");
  } finally {
    isSaving.value = false;
  }
}

// Lifecycle
onMounted(() => {
  fetchAnnouncement();
});
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        @click="router.push('/admin/announcements')"
        class="text-gray-600 hover:text-gray-800 dark:text-gray-400"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back
      </Button>
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ isNew ? "Create Announcement" : "Edit Announcement" }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          {{
            isNew
              ? "Create a new marquee announcement"
              : "Update announcement details"
          }}
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <Loader class="w-8 h-8 animate-spin text-primary" />
    </div>

    <!-- Form -->
    <div v-else class="space-y-6">
      <div
        class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-600 space-y-4"
      >
        <!-- Title -->
        <div>
          <label
            class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
            >Title *</label
          >
          <input
            v-model="form.title"
            type="text"
            placeholder="Enter title"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            :class="{ 'border-red-500': errors.title }"
          />
          <p v-if="errors.title" class="text-red-600 text-sm mt-1">
            {{ errors.title }}
          </p>
        </div>

        <!-- Category -->
        <div>
          <label
            class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
            >Category *</label
          >
          <input
            v-model="form.category"
            type="text"
            placeholder="Enter category"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            :class="{ 'border-red-500': errors.category }"
          />
          <p v-if="errors.category" class="text-red-600 text-sm mt-1">
            {{ errors.category }}
          </p>
        </div>

        <!-- Date -->
        <div>
          <label
            class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
            >Date *</label
          >
          <Popover>
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-full justify-start text-left font-normal',
                    !form.date && 'text-muted-foreground',
                  )
                "
              >
                <CalendarIcon class="mr-2 h-4 w-4" />
                {{
                  form.date
                    ? df.format(form.date.toDate(getLocalTimeZone()))
                    : "Pick a date"
                }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar v-model="form.date" initial-focus />
            </PopoverContent>
          </Popover>
          <p v-if="errors.date" class="text-red-600 text-sm mt-1">
            {{ errors.date }}
          </p>
        </div>

        <!-- Link -->
        <div>
          <label
            class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
            >Link *</label
          >
          <input
            v-model="form.href"
            type="url"
            placeholder="https://example.com"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            :class="{ 'border-red-500': errors.href }"
          />
          <p v-if="errors.href" class="text-red-600 text-sm mt-1">
            {{ errors.href }}
          </p>
        </div>

        <!-- Order -->
        <div>
          <label
            class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
            >Order</label
          >
          <input
            v-model.number="form.order"
            type="number"
            placeholder="0"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          />
        </div>

        <!-- Status -->
        <div>
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              v-model="form.isActive"
              type="checkbox"
              class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span class="text-sm font-medium text-gray-900 dark:text-white"
              >Active</span
            >
          </label>
        </div>
      </div>

      <!-- Actions -->
      <div class="space-y-2">
        <Button
          @click="saveAnnouncement"
          :disabled="isSaving"
          class="w-full bg-primary hover:bg-primary-600 dark:bg-green-500 dark:hover:bg-green-600"
        >
          <Save class="w-4 h-4 mr-2" />
          {{ isSaving ? "Saving..." : "Save Announcement" }}
        </Button>
        <Button
          variant="outline"
          @click="router.push('/admin/announcements')"
          class="w-full"
        >
          Cancel
        </Button>
      </div>
    </div>
  </div>
</template>
