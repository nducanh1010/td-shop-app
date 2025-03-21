import { toast, type ToastOptions } from "vue3-toastify";
export const useToast = () => {
  return {
    success: (msg: string) => toast.success(msg),
    warning: (msg: string) => toast.warning(msg),
    error: (msg: string) => toast.error(msg),
    info: (msg: string) => toast.info(msg),
  };
};
