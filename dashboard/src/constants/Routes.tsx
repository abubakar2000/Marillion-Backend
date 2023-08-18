import { RouteObject } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Subscription from "../pages/Dashboard/Subscription";
import Information from "../pages/Dashboard/Information";
import Users from "../pages/Dashboard/Users";
import DevicesPage from "../pages/Dashboard/DevicesPage";
import Transactions from "../pages/Dashboard/Transactions";

export const Routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Information />,
      },
      {
        path: "/info",
        element: <Information />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/devices",
        element: <DevicesPage />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
    ],
  },
];

export const AuthRoutes: RouteObject[] = [
  {
    path: "/",
    Component: Login,
  },
];
