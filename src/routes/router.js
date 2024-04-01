import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Test from "../pages/Test";
import Home from "../pages/resident/Home";
import Profil from "../pages/resident/Profil";
import EditProful from "../pages/resident/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Test />,
      },
      {
        path: "/home",
        index: true,
        element: <Home />,
      },
      {
        path: "/profile",
        index: true,
        element: <Profil />,
      },
      {
        path: "/profile/edit",
        index: true,
        element: <EditProful />,
      },
    ],
  },
]);

export default router;
