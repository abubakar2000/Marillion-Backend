import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthRoutes, Routes } from "../constants/Routes.tsx";

const appRouter = createBrowserRouter(Routes);
const authRouter = createBrowserRouter(AuthRoutes);

interface Props {
  isLoggedIn?: boolean;
}

export const AppRouter = ({ isLoggedIn }: Props) => {
  return (
    <div>
      <RouterProvider router={!isLoggedIn ? appRouter : authRouter} />
    </div>
  );
};
