import {
  Button,
  Checkbox,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import Dashboard from "../../layouts/Dashboard";
import Sidebar from "../shared/Sidebar";
import Topbar from "../shared/Topbar";
import { ChangeEvent, useEffect, useState } from "react";
import { User } from "../../types/user.model";
import userController from "../../utils/controllers/user";
import toast from "../../utils/utilities/toast";
import Datatable from "../shared/Datatable";

const { createuser, getallusers, remove } = userController;

const Users = () => {
  const [addUserPopup, setAddUserPopup] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState("");
  const [allUsers, setAllUsers] = useState<object[]>([]);
  const [newUser, setNewUser] = useState<User>({
    firstName: "",
    address: "",
    city: "",
    email: "",
    emailVerified: false,
    gender: "",
    imagePath: "",
    lastName: "",
    otp: 0,
    password: "",
    postalCode: "",
    telephone: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !newUser.password ||
      !verifyPassword ||
      newUser.password !== verifyPassword
    ) {
      toast.error("Invalid Password or they don't match");
      return;
    }
    createuser(newUser, () => {
      setAddUserPopup(!addUserPopup);
      setNewUser({
        firstName: "",
        address: "",
        city: "",
        email: "",
        emailVerified: false,
        gender: "",
        imagePath: "",
        lastName: "",
        otp: 0,
        password: "",
        postalCode: "",
        telephone: "",
      });
    });
  };

  useEffect(() => {
    getallusers((users) => {
      setAllUsers(users);
    });
  }, [newUser]);

  return (
    <Dashboard
      sidebar={<Sidebar />}
      topbar={
        <Topbar
          label="User"
          button={
            <Button onClick={() => setAddUserPopup(!addUserPopup)} color="pink">
              Add New
            </Button>
          }
        />
      }
    >
      <div className="text-2xl mb-3">All Users ({allUsers.length})</div>
      <Datatable
        data={allUsers}
        headers={[
          "ID",
          "First Name",
          "Last Name",
          "Email",
          "Gender",
          "City",
          "Zip Code",
          "Telephone",
          "Address",
        ]}
        exclude={[
          "password",
          "__v",
          "updatedAt",
          "createdAt",
          "otp",
          "emailVerified",
          "imagePath",
          "tempMail",
          "tempMailVerified",
        ]}
        actions={[
          {
            action: (ri) => {
              console.log("sending", (allUsers[ri] as any)["email"]);
              remove((allUsers[ri] as any)["email"], () => {
                console.log("Done");
              });
              setNewUser({
                firstName: "",
                address: "",
                city: "",
                email: "",
                emailVerified: false,
                gender: "",
                imagePath: "",
                lastName: "",
                otp: 0,
                password: "",
                postalCode: "",
                telephone: "",
              });
            },
            child: "Delete",
            className: "bg-red-400 hover:bg-red-600 action:bg-red-900",
          },
        ]}
      />

      <Dialog
        className="select-none"
        size="lg"
        dismiss={{ outsidePress: false }}
        open={addUserPopup}
        handler={() => setAddUserPopup(!addUserPopup)}
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>Add new user</DialogHeader>
          <DialogBody
            divider
            className="xl:px-16 px-4 xl:grid flex flex-col grid-cols-2 grid-flow-row gap-6 pt-12"
          >
            <Input
              value={newUser.firstName}
              onChange={handleChange}
              color="pink"
              name="firstName"
              label="First Name"
              size="lg"
            />
            <Input
              value={newUser.lastName}
              onChange={handleChange}
              color="pink"
              name="lastName"
              label="Last Name"
              size="lg"
            />
            <Input
              value={newUser.email}
              onChange={handleChange}
              color="pink"
              name="email"
              label="Email"
              size="lg"
              type="email"
            />
            <Input
              value={newUser.password}
              onChange={handleChange}
              color="pink"
              name="password"
              label="Password"
              size="lg"
              type="password"
            />
            <Input
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              color="pink"
              label="Verify Password"
              size="lg"
              type="password"
            />
            <Select
              value={newUser.gender}
              onChange={(v) => {
                if (v !== undefined) setNewUser({ ...newUser, gender: v });
              }}
              name="gender"
              color="pink"
              label="Select Gender"
            >
              <Option>Male</Option>
              <Option>Female</Option>
              <Option>Other</Option>
            </Select>
            <Input
              value={newUser.city}
              onChange={handleChange}
              name="city"
              color="pink"
              label="City"
              size="lg"
            />
            <Input
              value={newUser.postalCode}
              onChange={handleChange}
              name="postalCode"
              color="pink"
              label="Postcode"
              size="lg"
              type="number"
            />
            <Input
              value={newUser.telephone}
              onChange={handleChange}
              name="telephone"
              color="pink"
              label="Telephone"
              size="lg"
              type="tel"
            />
            <Input
              value={newUser.address}
              onChange={handleChange}
              name="address"
              color="pink"
              label="Address"
              size="lg"
            />
            <Checkbox
              checked={newUser.emailVerified}
              onChange={() =>
                setNewUser({
                  ...newUser,
                  emailVerified: !newUser.emailVerified,
                })
              }
              name="emailVerified"
              color="pink"
              label="Email Verified"
            />
          </DialogBody>
          <DialogFooter className="gap-3">
            <Button color="pink" onClick={() => setAddUserPopup(!addUserPopup)}>
              Close
            </Button>
            <Button color="pink" type="submit">
              Add User
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </Dashboard>
  );
};

export default Users;
