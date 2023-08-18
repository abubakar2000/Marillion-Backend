import api from "../utilities/api.interface";
import toast from "../utilities/toast";
export default {
  getalldevices: (callback: (data: object[]) => void) => {
    api
      .get("/device")
      .then((res) => {
        return callback(res?.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  },
  count: (callback: (data: object[]) => void) => {
    api
      .get("/device/count")
      .then((res) => {
        return callback(res?.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  },
  countRegion: (callback: (data: object) => void) => {
    api
      .get("/device/regcount")
      .then((data: any) => {
        return callback(data.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  },
};
