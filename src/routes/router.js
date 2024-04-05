import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Test from "../pages/Test";
import Home from "../pages/resident/Home";
import Profil from "../pages/resident/Profil";
import EditProful from "../pages/resident/EditProfile";
import Homec from "../pages/collector/Homec";




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // {
      //   path: "/",
      //   index: true,
      //   element: <Welcome />,
      // },
      // {
      //   path: "/login",
      //   index: true,
      //   element: <Login />,
      // },
      // {
      //   path: "/register",
      //   index: true,
      //   element: <Register />,
      // },
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
      {
        path:"/collector",
        index: true,
        element:<Homec />
      }
    ],
  },
]);

export default router;
