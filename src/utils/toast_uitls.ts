import { toast } from "sonner";

const SHOW_TOAST_TIME = 3000;

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: SHOW_TOAST_TIME,
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: SHOW_TOAST_TIME,
  });
};

export const showInfoToast = (message: string) => {
  toast.info(message, {
    duration: SHOW_TOAST_TIME,
  });
};

export const showWarningToast = (message: string) => {
  toast.warning(message, {
    duration: SHOW_TOAST_TIME,
  });
};
