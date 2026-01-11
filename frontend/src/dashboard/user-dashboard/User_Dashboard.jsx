import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function AdminNav() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <div className="admin-side-nav">
        {/* 
            Dashboard 
            Produts
               productList
               add new product
            Orders 
        */}
        <ul>
          <li>
            <i
              className={`bi bi-graph-up-arrow ${
                pathname === "/admin/dashboard" || pathname === "/admin"
                  ? "active"
                  : ""
              }`}
            ></i>
            <NavLink
              to={"/admin/dashboard"}
              className={`${
                pathname === "/admin/dashboard" ||
                (pathname === "/admin" && "active")
              }`}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <i
              className={`bi bi-minecart-loaded ${
                pathname === "/admin/products" && "active"
              }`}
            ></i>{" "}
            <NavLink to={"/admin/products"}>Products </NavLink>
          </li>
          <li>
            <i
              className={`bi bi-clipboard2-check-fill ${
                pathname === "/admin/orders" && "active"
              }`}
            ></i>{" "}
            <NavLink to={"/admin/orders"}>Orders</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminNav;
