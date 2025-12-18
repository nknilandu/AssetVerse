import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import AssetList from "../HrManagerPages/AssetList/AssetList";
import MyAssets from "../EmployeePages/MyAssets/MyAssets";
import LoadingPage from "../errorpages/LoadingPage/LoadingPage";

const Dashboard = () => {
  const { userRole } = useContext(AuthContext);
  if (userRole === null) {
    return <LoadingPage></LoadingPage>;
  } else if (userRole === "hr") {
    return <AssetList></AssetList>;
  } else {
    return <MyAssets></MyAssets>;
  }
};

export default Dashboard;
