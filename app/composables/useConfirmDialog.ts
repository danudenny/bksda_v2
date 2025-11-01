import { ref } from "vue";

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}

const isOpen = ref(false);
const options = ref<ConfirmOptions>({
  title: "",
  message: "",
  confirmText: "Confirm",
  cancelText: "Cancel",
  isDangerous: false,
});

let resolveCallback: ((value: boolean) => void) | null = null;

export function useConfirmDialog() {
  function open(opts: ConfirmOptions): Promise<boolean> {
    return new Promise((resolve) => {
      options.value = {
        confirmText: "Confirm",
        cancelText: "Cancel",
        isDangerous: false,
        ...opts,
      };
      resolveCallback = resolve;
      isOpen.value = true;
    });
  }

  function confirm() {
    isOpen.value = false;
    resolveCallback?.(true);
    resolveCallback = null;
  }

  function cancel() {
    isOpen.value = false;
    resolveCallback?.(false);
    resolveCallback = null;
  }

  return {
    isOpen,
    options,
    open,
    confirm,
    cancel,
  };
}
