<script setup lang="ts">
import { ref, watch, computed } from "vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const props = defineProps({
  isOpen: Boolean,
  category: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "save"]);

const form = ref({
  name: "",
  slug: "",
  description: "",
});

const isEditing = computed(() => !!props.category);

watch(
  () => props.isOpen,
  (value) => {
    if (value) {
      if (props.category) {
        form.value = { ...props.category };
      } else {
        form.value = {
          name: "",
          slug: "",
          description: "",
        };
      }
    }
  },
);

function generateSlug() {
  form.value.slug = form.value.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

function save() {
  emit("save", form.value);
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="$emit('close')">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ isEditing ? "Edit" : "Create" }} Category</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Name </Label>
          <Input
            id="name"
            v-model="form.name"
            class="col-span-3"
            @input="generateSlug"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="slug" class="text-right"> Slug </Label>
          <Input id="slug" v-model="form.slug" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="description" class="text-right"> Description </Label>
          <Textarea
            id="description"
            v-model="form.description"
            class="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="$emit('close')"> Cancel </Button>
        <Button @click="save"> Save </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
