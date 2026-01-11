import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function System_Admin_Dashboard() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <div className="admin-side-nav">
        <ul>
          <li>
            <i
              className={`bi bi-graph-up-arrow ${
                pathname === "/system-admin/dashboard" || pathname === "/admin"
                  ? "active"
                  : ""
              }`}
            ></i>
            <NavLink
              to={"/admin/dashboard"}
              className={`${
                pathname === "/system-admin/dashboard" ||
                (pathname === "/system-admin/" && "active")
              }`}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <i
              className={`bi bi-minecart-loaded ${
                pathname === "/system-admin/store-owners" && "active"
              }`}
            ></i>
            <NavLink to={"/system-admin/owner-details"}>Store Owners </NavLink>
          </li>
          <li>
            <i
              className={`bi bi-minecart-loaded ${
                pathname === "/system-admin/users" && "active"
              }`}
            ></i>{" "}
            <NavLink to={"/system-admin/users"}>Users</NavLink>
          </li>
          <li>
            <i
              className={`bi bi-minecart-loaded ${
                pathname === "/system-admin/stores" && "active"
              }`}
            ></i>{" "}
            <NavLink to={"/system-admin/stores"}>Stores </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default System_Admin_Dashboard;
