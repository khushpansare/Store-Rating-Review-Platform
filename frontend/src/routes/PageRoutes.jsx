import React from "react";
import { useRoutes } from "react-router-dom";

// CUSTOM COMPONENT
import CommonDashboard from "../dashboard/CommonDashboard";
import Welcome from "../pages/Welcome";
import Register from "../pages/authentication-pages/Register";
import Login from "../pages/authentication-pages/Login";

// SYSTEM-ADMIN
import SA_Owners from "../pages/system-admin-dashboard/Store_Owners";
import SA_Stores from "../pages/system-admin-dashboard/Stores";
import SA_Users from "../pages/system-admin-dashboard/Users";
import SA_Dashboard from "../pages/system-admin-dashboard/Dashboard";

// OWNER-STORE
import SO_Dashboard from "../pages/store-owner-dashboard/Dashboard";
import SO_Stores from "../pages/store-owner-dashboard/Stores";
import SO_Ratings from "../pages/store-owner-dashboard/Users_Rating";
import Trending_Store from "../pages/store-owner-dashboard/Trending_Store";
import DashboardLayout from "../layout/DashboardLayout";
import User_Main_Page from "../pages/user-pages/User_Main_Page";

function PageRoutes() {
  return useRoutes([
    {
      path: "/",
      element: <Welcome />,
    },
    {
      path: "/welcome",
      element: <Welcome />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/system-admin",
      element: <DashboardLayout />,
      children: [
        { index: true, element: <SA_Dashboard /> },
        { path: "", element: <SA_Dashboard /> },
        { path: "owner-details", element: <SA_Owners /> },
        { path: "users", element: <SA_Users /> },
        { path: "stores", element: <SA_Stores /> },
      ],
    },
    {
      path: "/store-owner",
      element: <DashboardLayout />,
      children: [
        { index: true, element: <SO_Dashboard /> },
        { path: "", element: <SO_Dashboard /> },
        { path: "stores", element: <SO_Stores /> },
        { path: "users-rating", element: <SO_Ratings /> },
        { path: "trending-store", element: <Trending_Store /> },
      ],
    },
    {
      path: "/user",
      element: <User_Main_Page />,
    },
  ]);
}

export default PageRoutes;
