import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import ComponentWrapper from "../wrapper/ComponentWrapper";
import CommonDashboard from "../dashboard/CommonDashboard";
import Error_404 from "../404 page/Error_404";

function DashboardLayout() {
  const { userDetails } = useContext(AuthContext);

  return (
    <ComponentWrapper flag={1}>
      <div className="admin-dashboard">
        {userDetails.user_details?.isLoggedIn ? (
          <>
            <CommonDashboard />
            <div className="w-100 d-flex flex-column">
              <Outlet />
            </div>
          </>
        ) : (
          <Error_404 />
        )}
      </div>
    </ComponentWrapper>
  );
}

export default DashboardLayout;
