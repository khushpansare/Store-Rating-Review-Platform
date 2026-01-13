import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Store_Owner_Dashboard() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <div className="admin-side-nav">
        <ul>
          <li>
            <i
              className={`bi bi-graph-up-arrow ${
                pathname === "/store-owner" && "active-link"
              }`}
            ></i>
            <NavLink
              to={"/store-owner"}
              className={`${pathname === "/store-owner" && "active-link"}`}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <i
              className={`bi bi-minecart-loaded ${
                pathname === "/store-owner/stores" && "active-link"
              }`}
            ></i>
            <NavLink
              to={"/store-owner/stores"}
              className={`${
                pathname === "/store-owner/stores" && "active-link"
              }`}
            >
              Stores
            </NavLink>
          </li>
          {/* <li>
            <i
              className={`bi bi-minecart-loaded ${
                pathname === "/store-owner/users-rating" && "active-link"
              }`}
            ></i>
            <NavLink
              to={"/store-owner/users-rating"}
              className={`${
                pathname === "/store-owner/users-rating" && "active-link"
              }`}
            >
              Users rating
            </NavLink>
          </li> */}
          <li>
            <i
              className={`bi bi-minecart-loaded ${
                pathname === "/store-owner/trending-store" && "active-link"
              }`}
            ></i>
            <NavLink
              to={"/store-owner/trending-store"}
              className={`${
                pathname === "/store-owner/trending-store" && "active-link"
              }`}
            >
              Trending Store
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Store_Owner_Dashboard;
