import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import LoadingPage from "../pages/errorpages/LoadingPage/LoadingPage";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { loading, user, userRole } = useContext(AuthContext);
  if (loading) {
    return <LoadingPage></LoadingPage>;
  } else if (user) {
    if (userRole === null) {
      return <LoadingPage></LoadingPage>;
    } else if (userRole === "hr") {
      return children;
    } else {
      return <Navigate state={location.pathname} to="/dashboard"></Navigate>;
    }
  } else {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
};

export default AdminRoute;
