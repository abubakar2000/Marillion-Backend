import { User } from "../../types/user.model";
import api from "../utilities/api.interface";
import toast from "../utilities/toast";

export default {
  createuser: (newUser: User, callback: (response_object: object) => void) => {
    api
      .post("/users", newUser)
      .then((value: any) => {
        return callback(value.data);
      })
      .catch((err) => {
        toast.error("An error occured, try again later");
        console.log(err);
      });
  },
  getallusers: (callback: (users: object[]) => void) => {
    api
      .get("/users")
      .then((value: any) => {
        return callback(value.data);
      })
      .catch((err) => {
        toast.error("An error occured, try again later");
        console.log(err);
      });
  },
  remove: (email: string, callback: (resp: object) => void) => {
    api
      .delete(`/users/${email}`)
      .then((value: any) => {
        return callback(value.data);
      })
      .catch((err) => {
        toast.error("An error occured, try again later");
        console.log(err);
      });
  },
  count: (callback: (resp: object) => void) => {
    api
      .get("/users/count")
      .then((value: any) => {
        return callback(value.data);
      })
      .catch((err) => {
        toast.error("An error occured, try again later");
        console.log(err);
      });
  },
};
