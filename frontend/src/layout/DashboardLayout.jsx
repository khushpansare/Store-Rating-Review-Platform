import React from "react";
import ComponentWrapper from "../wrapper/ComponentWrapper";
import CommonDashboard from "../dashboard/CommonDashboard";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <ComponentWrapper flag={1}>
      <div className="admin-dashboard">
        <CommonDashboard />
        <Outlet />
      </div>
    </ComponentWrapper>
  );
}

export default DashboardLayout;
