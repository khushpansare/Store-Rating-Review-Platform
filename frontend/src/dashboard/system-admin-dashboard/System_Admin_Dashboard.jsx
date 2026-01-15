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
                pathname === "/system-admin" ? "active-link" : ""
              }`}
            ></i>
            <NavLink
              to={"/system-admin"}
              className={`${pathname === "/system-admin" ? "active-link" : ""}`}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <i
              className={`bi bi-minecart-loaded ${
                pathname === "/system-admin/owner-details" && "active-link"
              }`}
            ></i>
            <NavLink
              to={"/system-admin/owner-details"}
              className={`${
                pathname === "/system-admin/owner-details" && "active-link"
              }`}
            >
              Store Owners{" "}
            </NavLink>
          </li>
          <li>
            <i
              className={`bi bi-minecart-loaded ${
                pathname === "/system-admin/users" && "active-link"
              }`}
            ></i>{" "}
            <NavLink
              to={"/system-admin/users"}
              className={`${
                pathname === "/system-admin/users" && "active-link"
              }`}
            >
              Users
            </NavLink>
          </li>
          <li>
            <i
              className={`bi bi-minecart-loaded ${
                pathname === "/system-admin/stores" && "active-link"
              }`}
            ></i>{" "}
            <NavLink
              to={"/system-admin/stores"}
              className={`${
                pathname === "/system-admin/stores" && "active-link"
              }`}
            >
              Stores{" "}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default System_Admin_Dashboard;
