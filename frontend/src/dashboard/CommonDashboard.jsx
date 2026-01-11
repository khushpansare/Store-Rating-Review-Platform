import React from "react";
import { useLocation } from "react-router-dom";
import System_Admin_Dashboard from "./system-admin-dashboard/System_Admin_Dashboard";
import Store_Owner_Dashboard from "./store-owner-dashboard/Store_Owner_Dashboard";
import ComponentWrapper from "../wrapper/ComponentWrapper";

function CommonDashboard() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      {pathname.includes("/system-admin") && <System_Admin_Dashboard />}

      {pathname.includes("/store-owner") && <Store_Owner_Dashboard />}
    </>
  );
}

export default CommonDashboard;
