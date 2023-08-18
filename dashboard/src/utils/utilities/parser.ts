import { Response } from "../../types/response.model";
import toast from "./toast";

export const response_parser = (object: Response) => {
  if (object.error) {
    toast.error(object.message);
    return object.payload;
  }
  toast.success(object.message);
  return object.payload;
};
