<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-4xl h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
      <DialogHeader class="px-6 py-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
        <DialogTitle>{{ title }}</DialogTitle>
      </DialogHeader>

      <div class="p-4 bg-gray-50 dark:bg-gray-900/50 flex flex-wrap items-center gap-2 shrink-0">
        <div class="relative flex-1 min-w-[200px]">
          <input
            v-model="search"
            @keyup.enter="handleSearch"
            type="text"
            placeholder="Search assets..."
            class="w-full px-3 py-2 pl-9 text-sm border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        
        <Button variant="secondary" @click="handleSearch" :disabled="loading">
          Search
        </Button>
        
        <div class="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2 hidden sm:block"></div>

        <Button v-if="allowUpload" @click="triggerLocalUpload" class="whitespace-nowrap">
          <Upload class="w-4 h-4 mr-2" /> 
          Upload
        </Button>
        <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleLocalUpload" :disabled="uploading" />
      </div>

      <div 
        ref="scrollEl" 
        class="flex-1 overflow-y-auto relative bg-gray-100 dark:bg-gray-950" 
        @scroll="onScroll"
      >
        <div :style="{ height: totalHeight + 'px', position: 'relative' }">
          <div :style="{ transform: `translateY(${topPadding}px)` }">
            <div 
              class="grid gap-4 p-4"
              :style="{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }"
            >
              <button
                v-for="asset in visibleAssets"
                :key="asset.public_id"
                class="group relative rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 aspect-square border border-gray-200 dark:border-gray-700 hover:ring-2 hover:ring-primary transition-all focus:outline-none"
                @click="select(asset)"
                title="Select image"
              >
                <img 
                  v-if="asset.url"
                  :src="getThumbUrl(asset.url)" 
                  loading="lazy" 
                  decoding="async" 
                  alt="Asset"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </button>
            </div>
          </div>
        </div>

        <div v-if="loading && assets.length === 0" class="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 z-10">
          <Loader class="w-8 h-8 animate-spin text-primary" />
        </div>
        
        <div v-if="!loading && assets.length === 0" class="h-full flex flex-col items-center justify-center text-gray-500">
          <p>No assets found.</p>
        </div>
        
        <div v-if="loading && assets.length > 0" class="flex justify-center py-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white dark:from-black to-transparent">
           <div class="bg-white dark:bg-gray-800 shadow-md rounded-full px-4 py-1 flex items-center gap-2 text-xs font-medium">
             <Loader class="w-3 h-3 animate-spin" /> Loading more...
           </div>
        </div>
      </div>

      <DialogFooter class="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
        <div class="flex-1 text-xs text-gray-500 flex items-center">
          Showing {{ assets.length }} assets
        </div>
        <DialogClose as-child>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, shallowRef, watch, onMounted, onBeforeUnmount, computed, nextTick } from 'vue';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Upload, Loader } from 'lucide-vue-next';
import { useApi } from '@/composables/useApi';
import { toast } from 'vue-sonner';

const props = withDefaults(defineProps<{
  open: boolean;
  title?: string;
  folder?: string;
  allowUpload?: boolean;
}>(), {
  title: 'Media Library',
  folder: 'bksda_v2/uploads',
  allowUpload: true,
});

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'select', asset: { url: string; public_id?: string }): void;
}>();

const open = ref(props.open);
const { request, uploadImage } = useApi();

const assets = shallowRef<any[]>([]); 

const loading = ref(false);
const nextCursor = ref<string | null>(null);
const search = ref('');
const scrollEl = ref<HTMLElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const uploading = ref(false);

const GRID_GAP = 16;
const MIN_TILE_WIDTH = 150;
const BUFFER_ROWS = 5;

const columns = ref(4);
const scrollTop = ref(0);
const containerHeight = ref(600);

const itemHeight = computed(() => {
  if (!scrollEl.value) return MIN_TILE_WIDTH + GRID_GAP;
  const containerW = scrollEl.value.clientWidth - 32;
  const tileW = (containerW - (columns.value - 1) * GRID_GAP) / columns.value;
  return tileW + GRID_GAP;
});

const totalRows = computed(() => Math.ceil(assets.value.length / columns.value));
const totalHeight = computed(() => totalRows.value * itemHeight.value);

const startIndex = computed(() => {
  const row = Math.floor(scrollTop.value / itemHeight.value);
  return Math.max(0, (row - BUFFER_ROWS) * columns.value);
});

const endIndex = computed(() => {
  const row = Math.ceil((scrollTop.value + containerHeight.value) / itemHeight.value);
  return Math.min(assets.value.length, (row + BUFFER_ROWS) * columns.value);
});

const topPadding = computed(() => {
  const startRow = Math.floor(startIndex.value / columns.value);
  return startRow * itemHeight.value;
});

const visibleAssets = computed(() => {
  return assets.value.slice(startIndex.value, endIndex.value);
});

watch(() => props.open, (v) => {
  open.value = v;
  if (v) {
    assets.value = [];
    nextCursor.value = null;
    search.value = '';
    nextTick(() => {
      recalcGrid();
      fetchAssets(true);
    });
  }
});

watch(open, (v) => emit('update:open', v));

async function fetchAssets(reset = false) {
  if (loading.value) return;
  loading.value = true;
  
  try {
    const params: any = { 
      limit: 50, // 50 is a good balance
      folder: props.folder,
    };
    
    if (search.value) params.q = search.value; // Ensure backend supports 'q' or use Cloudinary search API syntax
    if (!reset && nextCursor.value) params.nextCursor = nextCursor.value;

    const res = await request<{ assets: any[]; nextCursor: string | null }>('/cloudinary/assets', { params });
    
    if (res.success && res.data) {
      const newAssets = res.data.assets || [];
      if (reset) {
        assets.value = newAssets;
      } else {
        assets.value = [...assets.value, ...newAssets];
      }
      nextCursor.value = res.data.nextCursor || null;
    } else {
      toast.error('Failed to load assets');
    }
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

let scrollTicking = false;

function onScroll(e: Event) {
  const el = e.target as HTMLElement;
  
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      scrollTop.value = el.scrollTop;
      scrollTicking = false;
    });
    scrollTicking = true;
  }

  const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 400;
  if (nearBottom && nextCursor.value && !loading.value) {
    fetchAssets(false);
  }
}

function handleSearch() {
  assets.value = [];
  nextCursor.value = null;
  fetchAssets(true);
}

function getThumbUrl(url: string) {
  if (url.includes('/upload/')) {
    return url.replace('/upload/', '/upload/c_fill,w_300,h_300,q_auto:low,f_auto/');
  }
  return url;
}

function select(asset: any) {
  const url = asset?.url || asset?.secure_url || '';
  emit('select', { url, public_id: asset?.public_id });
  open.value = false;
}

function triggerLocalUpload() {
  fileInput.value?.click();
}

async function handleLocalUpload(e: Event) {
  const input = e.target as HTMLInputElement;
  if (!input.files?.length) return;
  
  const file = input.files![0] as File;
  uploading.value = true;
  
  try {
    const res = await uploadImage(file);
    if (res.success) {
      const newAsset = res.data as any;
      assets.value = [newAsset, ...assets.value];
      emit('select', { url: newAsset.url, public_id: newAsset.public_id });
      open.value = false;
      toast.success('Image uploaded');
    } else {
      toast.error('Upload failed');
    }
  } catch (err) {
    toast.error('Error uploading image');
  } finally {
    uploading.value = false;
    if (fileInput.value) fileInput.value.value = '';
  }
}

let resizeObserver: ResizeObserver | null = null;

function recalcGrid() {
  if (!scrollEl.value) return;
  const w = scrollEl.value.clientWidth;
  containerHeight.value = scrollEl.value.clientHeight;
  const newCols = Math.floor((w - 32) / (MIN_TILE_WIDTH + GRID_GAP));
  columns.value = Math.max(2, newCols);
}

onMounted(() => {
  if (open.value) fetchAssets(true);
  
  if (scrollEl.value) {
    resizeObserver = new ResizeObserver(() => {
      recalcGrid();
    });
    resizeObserver.observe(scrollEl.value);
  }
});

onBeforeUnmount(() => {
  if (resizeObserver) resizeObserver.disconnect();
});
</script>