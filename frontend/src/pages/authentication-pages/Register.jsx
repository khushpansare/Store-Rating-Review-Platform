import React, { useContext, useEffect, useState } from "react";
import ComponentWrapper from "../../wrapper/ComponentWrapper";
import admin_register_page from "../../assets/admin-register-page.png";
import Alert from "../../utiles/Alert";

import { Formik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const validationSchema = Yup.object({
  name: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  address: Yup.string()
    .max(400, "Must be 400 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

const initialValues = {
  name: "",
  email: "",
  address: "",
  password: "",
};

function Register() {
  const location = useLocation();
  const role = location.state.role;
  const [message, setmessage] = useState("");
  const navigate = useNavigate();

  const { handleRegister, setRole } = useContext(AuthContext);

  const handleFormSubmit = (values) => {
    handleRegister(values);
  };

  useEffect(() => {
    setRole(role);
  }, []);

  return (
    <>
      <ComponentWrapper>
        <div className="auth-container">
          <div className="img">
            {role === "admin" ? (
              <h3>Let's build your store's success together.</h3>
            ) : (
              <h3>Welcome! Let’s make shopping easy.</h3>
            )}
            <img src={admin_register_page} alt="" />
          </div>
          <div className="form-content">
            <Formik
              initialValues={initialValues}
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
                    <label htmlFor="name">Full Name: </label>
                    <br />
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="error-box">
                      {errors.name && touched.name && errors.name}
                    </div>
                  </div>

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
                    <label htmlFor="address">Address: </label>
                    <br />
                    <input
                      id="address"
                      type="text"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="error-box">
                      {errors.address && touched.address && errors.address}
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
    </>
  );
}

export default Register;
