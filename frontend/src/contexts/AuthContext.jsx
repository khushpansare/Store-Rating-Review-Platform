import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_base_Url = "http://localhost:5000";
  const [userDetails, setUserDetails] = useState({});
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const handleLogin = (values) => {
    if (role === "system-admin") {
      console.log("system-admin login");
    } else if (role === "store-owner") {
      axios
        .post(`${API_base_Url}/store-owner/login`, values, {
          withCredentials: true,
        })
        .then((res) => {
          setUserDetails(res.data);
          // console.log(res.data.user_details);
          navigate("/store-owner");
          const { isLoggedIn, _id, role } = res.data.user_details;
          localStorage.setItem(
            "loggedInData",
            JSON.stringify({
              loggedIn: isLoggedIn,
              id: _id,
              role: role,
            })
          );
        })
        .catch((err) => {
          // console.log(err.response.data);
          setUserDetails(err.response.data);
        });
    } else if (role === "user") {
      axios
        .post(`${API_base_Url}/user/login`, values, {
          withCredentials: true,
        })
        .then((res) => {
          setUserDetails(res.data);
          navigate("/user");
          const { isLoggedIn, _id, role } = res.data.user_details;
          localStorage.setItem(
            "loggedInData",
            JSON.stringify({
              loggedIn: isLoggedIn,
              id: _id,
              role: role,
            })
          );
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const handleRegister = (values) => {
    if (role === "system-admin") {
      navigate("/system-admin");
    } else if (role === "store-owner") {
      axios
        .post(`${API_base_Url}/store-owner/register`, values, {
          withCredentials: true,
        })
        .then((res) => {
          navigate("/store-owner");
          setUserDetails(res.data);
          const { isLoggedIn, _id, role } = res.data.user_details;
          localStorage.setItem(
            "loggedInData",
            JSON.stringify({
              loggedIn: isLoggedIn,
              id: _id,
              role: role,
            })
          );
        })
        .catch((err) => {
          alert(err);
        });
    } else if (role === "user") {
      axios
        .post(`${API_base_Url}/user/register`, values, {
          withCredentials: true,
        })
        .then((res) => {
          setUserDetails(res.data);
          navigate("/user");
          const { isLoggedIn, _id, role } = res.data.user_details;
          localStorage.setItem(
            "loggedInData",
            JSON.stringify({
              loggedIn: isLoggedIn,
              id: _id,
              role: role,
            })
          );
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const handlogout = () => {
    let user_role = JSON.parse(localStorage.getItem("loggedInData"));

    if (
      userDetails.user_details?.role === "system-admin" ||
      user_role?.role === "System Admin"
    ) {
      navigate("/system-admin");
    } else if (
      userDetails.user_details?.role === "Store Owner" ||
      user_role?.role === "Store Owner"
    ) {
      axios
        .post(
          `${API_base_Url}/store-owner/logout`,
          {},
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setUserDetails(res.data);
          // console.log(res.data);
          navigate("/");
          localStorage.clear();
        })
        .catch((err) => {
          alert(err);
        });
    } else if (
      userDetails.user_details?.role === "User" ||
      user_role?.role === "User"
    ) {
      axios
        .post(
          `${API_base_Url}/user/logout`,
          {},
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setUserDetails(res.data);
          navigate("/");
          localStorage.clear();
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const getUserDetails = (id) => {
    if (role === "system-admin" || pathname.includes("/system-admin")) {
      navigate("/system-admin");
    } else if (role === "store-owner" || pathname.includes("/store-owner")) {
      axios
        .get(`${API_base_Url}/store-owner/me/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log("authcontext", res.data);
          setUserDetails(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    } else if (role === "user" || pathname.includes("/user")) {
      axios
        .get(`${API_base_Url}/user/me/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setUserDetails(res.data);
          navigate("/user");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  useEffect(() => {
    let loggedInData = JSON.parse(localStorage.getItem("loggedInData"));

    if (loggedInData?.loggedIn) {
      getUserDetails(loggedInData?.id);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleRegister, userDetails, setRole, handlogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
