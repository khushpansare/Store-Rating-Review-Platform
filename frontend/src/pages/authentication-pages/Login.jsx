import React, { useContext, useEffect } from "react";
import ComponentWrapper from "../../wrapper/ComponentWrapper";
import admin_login_page from "../../assets/admin_login_page.png";

import { Formik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

function Login() {
  const location = useLocation();
  const role = location.state?.role;
  const navigate = useNavigate();

  const { handleLogin, setRole, userDetails, handlogout } =
    useContext(AuthContext);

  const handleFormSubmit = (values) => {
    handleLogin(values);
  };

  useEffect(() => {
    handlogout();
    if (!role) {
      navigate("/welcome", {
        state: {
          url: "/login",
          message: "Before login please choose by which role you want login",
        },
      });
    } else {
      setRole(role);
    }
  }, []);

  return (
    <ComponentWrapper>
      <div className="auth-container">
        <div className="img">
          <img src={admin_login_page} alt="" />
        </div>
        <div className="form-content">
          {role === "system-admin" && (
            <div style={{ textWrap: "balance" }}>
              <p className="text-dark text-center">
                <strong>
                  To login as system admin use <br />
                  <br />
                  E-Mail: systemadmin@gmail.com <br />
                  password: password
                </strong>
              </p>
            </div>
          )}

          <div style={{ textWrap: "balance" }}>
            {userDetails.isLoggedIn === false && (
              <p className="error-msg">
                <strong>{userDetails.message}</strong>
              </p>
            )}
          </div>
          <Formik
            initialValues={{
              fullname: "",
              store_name: "",
              email: "",
              phone: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">E-Mail: </label>
                  <br />
                  <input
                    id="email"
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="error-box">
                    {errors.email && touched.email && errors.email}
                  </div>
                </div>

                <div>
                  <label htmlFor="Password">Password: </label>
                  <br />
                  <input
                    id="password"
                    type="text"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="error-box">
                    {errors.password && touched.password && errors.password}
                  </div>
                </div>

                <button type="submit">Submit</button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </ComponentWrapper>
  );
}

export default Login;
