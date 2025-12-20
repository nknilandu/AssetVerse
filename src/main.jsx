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
import Profile from "../pages/Profile/Profile";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import PrivateRoute from "../route/PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddAsset from "../pages/HrManagerPages/AddAsset/AddAsset";
import AdminRoute from "../route/AdminRoute";
import AllRequest from "../pages/HrManagerPages/AllRequest/AllRequest";
import EmployeeList from "../pages/HrManagerPages/EmployeeList/EmployeeList";
import UpgradePackage from "../pages/HrManagerPages/UpgradePackage/UpgradePackage";
import MyAssets from "../pages/EmployeePages/MyAssets/MyAssets";
import RequestAsset from "../pages/EmployeePages/RequestAsset/RequestAsset";
import MyTeam from "../pages/EmployeePages/MyTeam/MyTeam";
import UpdateAsset from "../pages/HrManagerPages/UpdateAsset/UpdateAsset";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


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
  {
    path: "/",
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    errorElement: <AppNotFound></AppNotFound>,
    children: [
      {
        path: "dashboard",
        Component: Dashboard
      },
      {
        path: "add-asset",
        element: <AdminRoute>
          <AddAsset></AddAsset>
        </AdminRoute>
      },
      {
        path: "update-asset/:id",
        element: <AdminRoute>
          <UpdateAsset></UpdateAsset>
        </AdminRoute>
      },
      {
        path: "all-request",
        element: <AdminRoute>
          <AllRequest></AllRequest>
        </AdminRoute>
      },
      
      {
        path: "employee-list",
        element: <AdminRoute>
          <EmployeeList></EmployeeList>
        </AdminRoute>
      },
      {
        path: "upgrade-package",
        element: <AdminRoute>
          <UpgradePackage></UpgradePackage>
        </AdminRoute>
      },
      {
        path: "request-asset",
        element: <PrivateRoute>
          <RequestAsset></RequestAsset>
        </PrivateRoute>
      },
      {
        path: "my-team",
        element: <PrivateRoute>
          <MyTeam></MyTeam>
        </PrivateRoute>
      },
      {
        path: "profile",
        element: <PrivateRoute>
          <Profile></Profile>
        </PrivateRoute>
      },
      {
        path: "*",
        Component: PageNotFound,
      },
    ],
  },
]);

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
