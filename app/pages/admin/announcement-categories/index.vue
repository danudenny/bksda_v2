<template>
  <div class="p-6 mx-auto">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Announcement Categories</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm">Manage and organize your announcement categories effectively.</p>
      </div>
      <Button @click="openModal()" class="shadow-sm">
        <Plus class="w-4 h-4 mr-2" />
        New Category
      </Button>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      
      <div v-if="pending" class="p-12 flex flex-col items-center justify-center text-gray-500">
        <Loader class="w-8 h-8 animate-spin text-primary mb-4" />
        <p class="text-sm">Loading categories...</p>
      </div>

      <div v-else-if="error" class="p-8 text-center">
        <div class="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg inline-block">
          <p>Failed to load categories: {{ error.message }}</p>
          <Button variant="outline" size="sm" class="mt-2" @click="refresh">Try Again</Button>
        </div>
      </div>

      <div v-else>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-400 border-b dark:border-gray-700">
              <tr>
                <th scope="col" class="px-6 py-4 font-semibold">Name</th>
                <th scope="col" class="px-6 py-4 font-semibold">Slug</th>
                <th scope="col" class="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              <tr v-if="!categories || categories.length === 0">
                <td colspan="3" class="px-6 py-12 text-center">
                  <div class="flex flex-col items-center justify-center text-gray-400">
                    <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-3">
                      <FolderOpen class="w-6 h-6" />
                    </div>
                    <p class="text-base font-medium text-gray-900 dark:text-white">No categories found</p>
                    <p class="text-sm mt-1">Get started by creating a new category.</p>
                    <Button variant="link" class="mt-2 text-primary" @click="openModal()">Create Now</Button>
                  </div>
                </td>
              </tr>

              <tr v-for="category in categories" :key="category.id" class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td class="px-6 py-4">
                  <span class="font-medium text-gray-900 dark:text-white">{{ category.name }}</span>
                </td>
                <td class="px-6 py-4">
                  <code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs font-mono text-gray-600 dark:text-gray-300">
                    {{ category.slug }}
                  </code>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" @click="openModal(category)" class="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400">
                      <Pencil class="w-4 h-4" />
                      <span class="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" @click="confirmDelete(category.id)" class="h-8 w-8 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400">
                      <Trash2 class="w-4 h-4" />
                      <span class="sr-only">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="closeModal">
          
          <div 
            class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all scale-100"
            role="dialog"
          >
            <div class="flex justify-between items-center p-5 border-b dark:border-gray-700">
              <div>
                <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ form.id ? 'Edit Category' : 'New Category' }}</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400">Fill in the details below.</p>
              </div>
              <Button variant="ghost" size="icon" @click="closeModal" class="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <X class="w-5 h-5" />
              </Button>
            </div>

            <div class="p-6 space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name <span class="text-red-500">*</span></label>
                <input 
                  v-model="form.name" 
                  @input="handleNameInput"
                  type="text" 
                  placeholder="e.g., System Updates" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-900 dark:border-gray-600 dark:text-white transition-shadow" 
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Slug <span class="text-xs font-normal text-gray-400 ml-1">(Auto-generated)</span>
                </label>
                <input 
                  v-model="form.slug" 
                  type="text" 
                  placeholder="e.g., system-updates" 
                  class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-900 dark:border-gray-600 dark:text-white font-mono text-sm" 
                />
              </div>
            </div>

            <div class="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl flex justify-end gap-3 border-t dark:border-gray-700">
              <Button variant="outline" @click="closeModal">Cancel</Button>
              <Button @click="saveCategory" :disabled="isSaving">
                <Loader v-if="isSaving" class="w-4 h-4 mr-2 animate-spin" />
                {{ isSaving ? 'Saving...' : 'Save Changes' }}
              </Button>
            </div>
          </div>

        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Button } from '@/components/ui/button'; // Asumsi path
import { Plus, Pencil, Trash2, Loader, X, FolderOpen } from 'lucide-vue-next';
import { useApi } from '@/composables/useApi';
import { useConfirmDialog } from '@/composables/useConfirmDialog';
import { toast } from 'vue-sonner';

definePageMeta({
  layout: 'admin',
});

// 1. Define Interface for Type Safety
interface Category {
  id?: string;
  name: string;
  slug: string;
}

const { confirm } = useConfirmDialog();
const api = useApi();

// Async Data Fetching
const { 
  data: categories, 
  pending, 
  error, 
  refresh 
} = useAsyncData<Category[]>('announcement-categories', async () => {
  const response = await api.getAnnouncementCategories();
  return response.data;
});

// State Management
const isModalOpen = ref(false);
const isSaving = ref(false);
const isSlugManuallyEdited = ref(false);

// Reactive Form State
const form = reactive<Category>({
  id: '',
  name: '',
  slug: ''
});

// Reset Form Helper
function resetForm() {
  form.id = '';
  form.name = '';
  form.slug = '';
  isSlugManuallyEdited.value = false;
}

// Open Modal Logic
function openModal(category: Category | null = null) {
  resetForm();
  if (category) {
    // Edit Mode
    form.id = category.id;
    form.name = category.name;
    form.slug = category.slug;
    isSlugManuallyEdited.value = true; // Prevent auto-update on edit unless user clears it
  }
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  setTimeout(() => resetForm(), 300); // Wait for transition
}

// Slug Generation Logic
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

function handleNameInput() {
  if (!isSlugManuallyEdited.value) {
    form.slug = slugify(form.name);
  }
}

// Save Logic
async function saveCategory() {
  if (!form.name) {
    toast.error('Validation Error', { description: 'Category name is required.' });
    return;
  }
  
  // Fallback slug generation if empty
  if (!form.slug) {
    form.slug = slugify(form.name);
  }

  isSaving.value = true;
  try {
    const payload = { 
      name: form.name, 
      slug: form.slug 
    };

    if (form.id) {
      await api.updateAnnouncementCategory(form.id, payload);
      toast.success('Category updated successfully');
    } else {
      await api.createAnnouncementCategory(payload);
      toast.success('Category created successfully');
    }
    
    closeModal();
    refresh();
  } catch (err: any) {
    toast.error('Operation Failed', { description: err.message || 'Something went wrong.' });
  } finally {
    isSaving.value = false;
  }
}

// Delete Logic
async function confirmDelete(id: string) {
  if (!id) return;
  
  const confirmed = await confirm(
    'Delete Category?',
    'This action cannot be undone. All related announcements might be affected.'
  );
  
  if (confirmed) {
    try {
      await api.deleteAnnouncementCategory(id);
      toast.success('Category deleted');
      refresh();
    } catch (err: any) {
      toast.error('Delete Failed', { description: err.message });
    }
  }
}
</script>