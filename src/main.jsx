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
import HrRegister from "../pages/HrRegister/HrRegister";
import EmployeeRegister from "../pages/EmployeeRegister/EmployeeRegister";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import AuthProvider from "../provider/AuthProvider";
import AssetList from "../pages/HrManagerPages/AssetList/AssetList";
import Profile from "../pages/Profile/Profile";

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
        path: "profile",
        Component: Profile
      },
      {
        path: "*",
        Component: PageNotFound,
      }
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
        path: "employee-registration",
        Component: EmployeeRegister
      },
      {
        path: "hr-registration",
        Component: HrRegister
      },
      {
        path: "forgot-password",
        Component: ForgotPassword
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
