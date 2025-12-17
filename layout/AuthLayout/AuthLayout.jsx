import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import LoadingPage from "../../pages/errorpages/LoadingPage/LoadingPage";

const AuthLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingPage></LoadingPage>;
  } else if (user) {
    return <Navigate to="/"></Navigate>;
  } else {
    return (
      <div>
        <Outlet></Outlet>
        <Toaster />
      </div>
    );
  }
};

export default AuthLayout;
