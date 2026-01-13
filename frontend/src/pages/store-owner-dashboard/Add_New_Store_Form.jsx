import React, { useContext, useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Store_Details_Context } from "../../contexts/Store_Details_Context";

// store_name: "",
// store_address: "",
// store_landmark: "",
// store_pincode: "",
// store_city: "",
// store_state: "",
// store_country: "",

const store_validationSchema = Yup.object({
  store_name: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required*"),
  store_address: Yup.string()
    .max(500, "Must be 500 characters or less")
    .required("Required*"),
  store_landmark: Yup.string()
    .max(500, "Must be 500 characters or less")
    .required("Required*"),
  store_pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Pincode Must be exactly 6 digits")
    .required("Pincode is required"),
  store_city: Yup.string()
    .max(50, "Must be 50 characters or less")
    .required("Required*"),
  store_state: Yup.string()
    .max(50, "Must be 50 characters or less")
    .required("Required*"),
  store_country: Yup.string()
    .max(50, "Must be 50 characters or less")
    .required("Required*"),
});

function Add_New_Store_Form({
  setStore_form_data,
  store_form_data,
  updateHandlerFlag,
  storeId,
}) {
  const { handleAddStore, handleUpdateStore } = useContext(
    Store_Details_Context
  );

  return (
    <>
      <div className="product-form">
        <Formik
          initialValues={{
            store_name: store_form_data.store_name,
            store_address: store_form_data.store_address,
            store_landmark: store_form_data.store_landmark,
            store_pincode: store_form_data.store_pincode,
            store_city: store_form_data.store_city,
            store_state: store_form_data.store_state,
            store_country: store_form_data.store_country,
          }}
          enableReinitialize
          validationSchema={store_validationSchema}
          onSubmit={(values) => {
            updateHandlerFlag
              ? handleUpdateStore(storeId, values)
              : handleAddStore(values);
          }}
        >
          {({ values, errors, touched, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="store_name">Store Name </label>
                <br />
                <input
                  type="text"
                  id="store_name"
                  className="w-100"
                  name="store_name"
                  value={store_form_data.store_name}
                  onChange={(e) => {
                    setStore_form_data({
                      ...store_form_data,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={handleBlur}
                />
                <div className="error-msg">
                  {errors.store_name && touched.store_name && errors.store_name}
                </div>
              </div>

              <div className="my-3">
                <label htmlFor="store_address">Store Address </label>
                <br />
                <input
                  type="text"
                  className="w-100"
                  id="store_address"
                  name="store_address"
                  value={store_form_data.store_address}
                  onChange={(e) => {
                    setStore_form_data({
                      ...store_form_data,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={handleBlur}
                />
                <div className="error-msg">
                  {errors.store_address &&
                    touched.store_address &&
                    errors.store_address}
                </div>
              </div>

              <div className="my-3">
                <label htmlFor="store_landmark">Landmark: </label>
                <br />
                <input
                  type="text"
                  className="w-100"
                  id="store_landmark"
                  name="store_landmark"
                  value={store_form_data.store_landmark}
                  onChange={(e) => {
                    setStore_form_data({
                      ...store_form_data,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={handleBlur}
                />
                <div className="error-msg">
                  {errors.store_landmark &&
                    touched.store_landmark &&
                    errors.store_landmark}
                </div>
              </div>

              <div className="my-3 text-left">
                <label htmlFor="store_pincode text-left">Pincode: </label>
                <br />
                <input
                  type="text"
                  className="w-100"
                  id="store_pincode"
                  name="store_pincode"
                  value={store_form_data.store_pincode}
                  onChange={(e) => {
                    setStore_form_data({
                      ...store_form_data,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={handleBlur}
                />
                <div className="error-msg">
                  {errors.store_pincode &&
                    touched.store_pincode &&
                    errors.store_pincode}
                </div>
              </div>

              <div className="my-3 text-left">
                <label htmlFor="store_city text-left">City: </label>
                <br />
                <input
                  type="text"
                  className="w-100"
                  id="store_city"
                  name="store_city"
                  value={store_form_data.store_city}
                  onChange={(e) => {
                    setStore_form_data({
                      ...store_form_data,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={handleBlur}
                />
                <div className="error-msg">
                  {errors.store_city && touched.store_city && errors.store_city}
                </div>
              </div>

              <div className="my-3 text-left">
                <label htmlFor="store_state text-left">State: </label>
                <br />
                <input
                  type="text"
                  className="w-100"
                  id="store_state"
                  name="store_state"
                  value={store_form_data.store_state}
                  onChange={(e) => {
                    setStore_form_data({
                      ...store_form_data,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={handleBlur}
                />
                <div className="error-msg">
                  {errors.store_state &&
                    touched.store_state &&
                    errors.store_state}
                </div>
              </div>

              <div className="my-3 text-left">
                <label htmlFor="store_country text-left">Country: </label>
                <br />
                <input
                  type="text"
                  className="w-100"
                  id="store_country"
                  name="store_country"
                  value={store_form_data.store_country}
                  onChange={(e) => {
                    setStore_form_data({
                      ...store_form_data,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={handleBlur}
                />
                <div className="error-msg">
                  {errors.store_country &&
                    touched.store_country &&
                    errors.store_country}
                </div>
              </div>

              <div className="text-left">
                <button
                  type="submit"
                  aria-hidden="true"
                  data-bs-dismiss="modal"
                >
                  {updateHandlerFlag ? "Update Store" : "Add Store"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Add_New_Store_Form;
