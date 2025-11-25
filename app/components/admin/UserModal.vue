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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const props = defineProps({
  isOpen: Boolean,
  user: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "save"]);

const form = ref({
  name: "",
  email: "",
  password: "",
  role: "AUTHOR",
  isActive: true,
});

const isEditing = computed(() => !!props.user);

watch(
  () => props.isOpen,
  (value) => {
    if (value) {
      if (props.user) {
        form.value = {
          name: props.user.name,
          email: props.user.email,
          password: "", // Don't populate password on edit
          role: props.user.role,
          isActive: props.user.isActive,
        };
      } else {
        form.value = {
          name: "",
          email: "",
          password: "",
          role: "AUTHOR",
          isActive: true,
        };
      }
    }
  }
);

function save() {
  emit("save", form.value);
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="$emit('close')">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ isEditing ? "Edit" : "Create" }} User</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Name </Label>
          <Input id="name" v-model="form.name" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="email" class="text-right"> Email </Label>
          <Input id="email" type="email" v-model="form.email" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="password" class="text-right"> Password </Label>
          <Input
            id="password"
            type="password"
            v-model="form.password"
            :placeholder="isEditing ? 'Leave blank to keep current' : ''"
            class="col-span-3"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="role" class="text-right"> Role </Label>
          <Select v-model="form.role">
            <SelectTrigger class="col-span-3">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="AUTHOR">Author</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="isActive" class="text-right"> Active </Label>
          <div class="flex items-center space-x-2 col-span-3">
            <Switch id="isActive" :checked="form.isActive" @update:checked="(val) => form.isActive = val" />
            <Label for="isActive">{{ form.isActive ? "Active" : "Inactive" }}</Label>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="$emit('close')"> Cancel </Button>
        <Button @click="save"> Save </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
