import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import System_Admin_Dashboard from "./system-admin-dashboard/System_Admin_Dashboard";
import Store_Owner_Dashboard from "./store-owner-dashboard/Store_Owner_Dashboard";
import { AuthContext } from "../contexts/AuthContext";

function CommonDashboard() {
  const location = useLocation();
  const { pathname } = location;

  const { userDetails } = useContext(AuthContext);

  return (
    <>
      {userDetails.role === "System Admin" && <System_Admin_Dashboard />}

      {userDetails.role === "Store Owner" && <Store_Owner_Dashboard />}
    </>
  );
}

export default CommonDashboard;
