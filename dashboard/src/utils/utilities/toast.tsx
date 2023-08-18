import { toast } from "react-toastify";

export default {
  success: (message: string) => {
    toast(message, {
      type: "success",
      position: "bottom-right",
    });
  },
  error: (message: string) => {
    toast(message, {
      type: "error",
      position: "bottom-right",
    });
  },
};
