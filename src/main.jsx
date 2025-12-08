import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "../pages/Home/Home";
import PageNotFound from "../pages/errorpages/PageNotFound/PageNotFound";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import RootLayout from "../layout/RootLayout/RootLayout";
import AppNotFound from "../pages/errorpages/AppNotFound/AppNotFound";
import Login from "../pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <AppNotFound></AppNotFound>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "*",
        Component: PageNotFound,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    errorElement: <AppNotFound></AppNotFound>,
    children: [
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
      },
      {
        path: "*",
        Component: PageNotFound,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
