import { RouterProvider, createHashRouter } from "react-router-dom";
import { AuthRoutes, Routes } from "../constants/Routes.tsx";

const appRouter = createHashRouter(Routes);
const authRouter = createHashRouter(AuthRoutes);

interface Props {
  isLoggedIn?: string;
}

export const AppRouter = ({ isLoggedIn }: Props) => {
  return (
    <div>
      <RouterProvider router={isLoggedIn ? appRouter : authRouter} />
    </div>
  );
};
