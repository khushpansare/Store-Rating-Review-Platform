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
          // navigate("/store-owner");
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
          setUserDetails(res.data.user_details);
          navigate("/user");
        })
        .catch((err) => {
          console.log(err);
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
          setUserDetails(res.data.user_details);
          navigate("/store-owner");
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
          setUserDetails(res.data.user_details);
          navigate("/user");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const handlogout = () => {
    if (userDetails.role === "system-admin") {
      navigate("/system-admin");
    } else if (userDetails.role === "Store Owner") {
      axios
        .post(`${API_base_Url}/store-owner/logout`, {
          withCredentials: true,
        })
        .then((res) => {
          setUserDetails([]);
          navigate("/");
        })
        .catch((err) => {
          alert(err);
        });
    } else if (userDetails.role === "User") {
      axios
        .post(`${API_base_Url}/user/logout`, {
          withCredentials: true,
        })
        .then((res) => {
          setUserDetails([]);
          navigate("/");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  useEffect(() => {
    if (role === "system-admin" || pathname.includes("/system-admin")) {
      navigate("/system-admin");
    } else if (role === "store-owner" || pathname.includes("/store-owner")) {
      axios
        .get(`${API_base_Url}/store-owner/me`, {
          withCredentials: true,
        })
        .then((res) => {
          setUserDetails(res.data.user_details);
        })
        .catch((err) => {
          alert(err);
        });
    } else if (role === "user" || pathname.includes("/user")) {
      axios
        .get(`${API_base_Url}/user/me`, {
          withCredentials: true,
        })
        .then((res) => {
          setUserDetails(res.data.user_details);
          navigate("/user");
        })
        .catch((err) => {
          alert(err);
        });
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
