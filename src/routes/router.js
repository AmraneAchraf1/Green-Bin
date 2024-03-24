import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Test from "../pages/Test";

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
    ],
  },
]);

export default router;
