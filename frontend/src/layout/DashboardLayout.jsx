import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import ComponentWrapper from "../wrapper/ComponentWrapper";
import CommonDashboard from "../dashboard/CommonDashboard";
import Error_404 from "../404 page/Error_404";
import { Store_Details_Context } from "../contexts/Store_Details_Context";

function DashboardLayout() {
  const location = useLocation();
  const { userDetails } = useContext(AuthContext);
  const { getStoresData } = useContext(Store_Details_Context);

  useEffect(() => {
    getStoresData();
  }, [location]);

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
