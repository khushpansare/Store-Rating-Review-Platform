import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Nav_Mobile from "./Nav_Mobile";

const welcomePageData = {
  login: {
    path: "/login",
  },
  register: {
    path: "/register",
  },
};

function Navbar() {
  const location = useLocation();
  const { pathname } = location;
  const [url_path, seturl_path] = useState(pathname);

  const mobile_nav_toggle_ref = useRef(null);

  const [mobile_nav_flag, setmobile_nav_flag] = useState(false);

  const open_mobile_nav = () => {
    setmobile_nav_flag(!mobile_nav_flag);
    mobile_nav_toggle_ref.current.classList.remove("mobile-nav-display");
  };

  const close_mobile_nav = () => {
    setmobile_nav_flag(!mobile_nav_flag);
    mobile_nav_toggle_ref.current.classList.add("mobile-nav-display");
  };

  return (
    <>
      <header>
        <nav>
          <ul className="logo">
            <h2>Logo</h2>
          </ul>
          <ul className="middle-list">
            <li>
              <Link to={"/products"}>Products</Link>
            </li>
            <li>
              <Link to={"/admin"}>Admin Dashboard</Link>
            </li>
            <li>
              <Link to={"/user-dashboard"}>User Dashboard</Link>
            </li>
          </ul>
          <ul>
            <div className="btn-group">
              <a
                type="button"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
                style={{
                  outline: "none",
                  border: "none",
                  borderRadius: "50%",
                  // padding: "7px 10px ",
                }}
              >
                <i className="bi bi-person-circle"></i>
              </a>
              <ul className="bg-dark dropdown-menu dropdown-menu-end text-center">
                <li>
                  <Link to={"/welcome"} state={welcomePageData.login}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to={"/welcome"} state={welcomePageData.register}>
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </ul>
          <ul className="ham-burger-menu">
            {mobile_nav_flag ? (
              <a onClick={close_mobile_nav}>
                <i className="bi bi-x-lg"></i>
              </a>
            ) : (
              <a onClick={open_mobile_nav}>
                <i className="bi bi-list"></i>
              </a>
            )}
          </ul>
        </nav>
      </header>

      <Nav_Mobile
        mobile_nav_toggle_ref={mobile_nav_toggle_ref}
        close_mobile_nav={close_mobile_nav}
      />
    </>
  );
}

export default Navbar;
