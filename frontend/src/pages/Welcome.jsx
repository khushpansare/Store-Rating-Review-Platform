import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// CUSTOM COMPONENT
import ComponentWrapper from "../wrapper/ComponentWrapper";

// ASSETS
import Seller from "../assets/seller.png";
import Buyer from "../assets/customer.png";

function Welcome() {
  const location = useLocation();
  const { pathname } = location;

  const [url_path, seturl_path] = useState("/register");

  useEffect(() => {
    if (pathname === "/") {
      seturl_path("/register");
    } else {
      const { path } = location.state;
      seturl_path(path);
    }
  }, [location]);

  return (
    <ComponentWrapper>
      <div className="welcome-container">
        {url_path === "/register" ? (
          <h1>Register yourself as</h1>
        ) : (
          <h1>Login as</h1>
        )}

        <div className="d-flex justify-content-center flex-wrap">
          <div className="admin">
            <img src={Seller} alt="" />
            <br />

            {/* {path === "/register" ? (
            <h4>Want to sell your products?</h4>
          ) : (
            <h4>Admin Login</h4>
          )} */}

            <Link to={"/login"} state={{ role: "system-admin" }}>
              System Admin
            </Link>
          </div>

          <div className="admin">
            <img src={Seller} alt="" />
            <br />
            {/* {path === "/register" ? (
            <h4>Want to sell your products?</h4>
          ) : (
            <h4>Admin Login</h4>
          )} */}

            <Link to={url_path} state={{ role: "store-owner" }}>
              Store Owner
            </Link>
          </div>

          <div className="user">
            <img src={Buyer} alt="" />
            <br />

            {/* {path === "/register" ? (
            <h4>Want to buy products?</h4>
          ) : (
            <h4>User Login</h4>
          )}
 */}
            <Link to={url_path} state={{ role: "user" }}>
              User
            </Link>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
}

export default Welcome;
