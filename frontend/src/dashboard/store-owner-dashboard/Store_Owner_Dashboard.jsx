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
                pathname === "/store-owner/dashboard" ||
                pathname === "/store-owner"
                  ? "active"
                  : ""
              }`}
            ></i>
            <NavLink
              to={"/store-owner/dashboard"}
              className={`${
                pathname === "/store-owner/dashboard" ||
                (pathname === "/store-owner" && "active")
              }`}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <i
              className={`bi bi-minecart-loaded ${
                pathname === "/store-owner/stores" && "active"
              }`}
            ></i>
            <NavLink to={"/store-owner/stores"}>Stores</NavLink>
          </li>
          <li>
            <i
              className={`bi bi-minecart-loaded ${
                pathname === "/store-owner/users-rating" && "active"
              }`}
            ></i>
            <NavLink to={"/store-owner/users-rating"}>Users rating</NavLink>
          </li>
          <li>
            <i
              className={`bi bi-minecart-loaded ${
                pathname === "/store-owner/trending-store" && "active"
              }`}
            ></i>
            <NavLink to={"/store-owner/trending-store"}>Trending Store</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Store_Owner_Dashboard;
