import React from "react";
import { Link } from "react-router-dom";
// import Logo from "../assets/Logo.png";

function Nav_Mobile({ mobile_nav_toggle_ref, close_mobile_nav }) {
  const handleLink = (id) => {
    close_mobile_nav();
  };

  return (
    <>
      <div
        className="mobile-nav mobile-nav-display"
        ref={mobile_nav_toggle_ref}
      >
        <nav>
          <ul className="left-side">
            {/* <img src={Logo} alt="" /> */}
            <h3>Logo</h3>
          </ul>

          <ul className="right-side">
            <li>
              <Link to={"/products"}>Products</Link>
            </li>
            <li>
              <Link to={"/admin-dashboard"}>Admin Dashboard</Link>
            </li>
            <li>
              <Link to={"/user-dashboard"}>User Dashboard</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Nav_Mobile;
