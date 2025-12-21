import React, { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import LoadingPage from "../../pages/errorpages/LoadingPage/LoadingPage";

const AuthLayout = () => {
  const { user, loading } = useContext(AuthContext);

  // for theme control
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const html = document.querySelector("html");
    html.setAttribute("data-theme", savedTheme);
  }, []);

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
