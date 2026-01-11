import React from "react";
import ComponentWrapper from "../../wrapper/ComponentWrapper";
import admin_login_page from "../../assets/admin_login_page.png";

import { Formik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

function Login() {
  const location = useLocation();
  const role = location.state.role;

  const handleFormSubmit = (values) => {
    console.log(values);

    if (role === "system-admin") {
      console.log("system-admin login");
    } else if (role === "store-owner") {
      console.log("store-owner login");
    } else if (role === "user") {
      console.log("user login");
    }
    // navigate("/admin/products");
    // axios
    //   .post("http://localhost:5000/admin/register", values, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setmessage(res.data);
    //     navigate("/admin/products");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <ComponentWrapper>
      <div className="auth-container">
        <div className="img">
          {role === "admin" ? (
            <h3>Welcome back. Let's grow together.</h3>
          ) : (
            <h3> Welcome back. Your shopping journey continues.</h3>
          )}

          <img src={admin_login_page} alt="" />
        </div>
        <div className="form-content">
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
