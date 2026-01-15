import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

// MUI COMPONENT
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";

// CUSTOM COMPONENT
import Model from "../../utiles/Model";
import { Store_Details_Context } from "../../contexts/Store_Details_Context";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ffc107",
  },
  "& .MuiRating-iconHover": {
    color: "#ffb300",
  },
});

function Stores() {
  const { storeDetailsData, handleDeleteStore, stores_data_by_owner } =
    useContext(Store_Details_Context);
  const { userDetails } = useContext(AuthContext);
  const [updateHandlerFlag, setupdateHandlerFlag] = useState(false);
  const [storeId, setStoreId] = useState("");
  const [store_form_data, setStore_form_data] = useState({
    store_name: "",
    store_address: "",
    store_landmark: "",
    store_pincode: "",
    store_city: "",
    store_state: "",
    store_country: "",
  });

  const handleEdit = (store_id, val) => {
    setStore_form_data({
      store_name: val.store_name,
      store_address: val.store_address,
      store_landmark: val.store_landmark,
      store_pincode: val.store_pincode,
      store_city: val.store_city,
      store_state: val.store_state,
      store_country: val.store_country,
    });
    setupdateHandlerFlag(true);
    setStoreId(store_id);
  };

  const handleFormStates = () => {
    setStore_form_data({
      store_name: "",
      store_address: "",
      store_landmark: "",
      store_pincode: "",
      store_city: "",
      store_state: "",
      store_country: "",
    });
    setupdateHandlerFlag(false);
    setStoreId("");
  };

  useEffect(() => {
    // console.log(userDetails.user_details?._id);
    stores_data_by_owner(userDetails.user_details?._id);
  }, []);

  return (
    <>
      <div className="table-wrapper">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between py-3 px-5 header">
          <h3>Store Details</h3>
          <a
            data-bs-toggle="modal"
            data-bs-target="#add-store-modal"
            onClick={handleFormStates}
          >
            <i className="bi bi-plus-circle"></i> Add Store
          </a>
        </div>

        {storeDetailsData.length >= 1 ? (
          <table>
            <thead>
              <tr>
                <th>Store Name</th>
                <th>Store Address</th>
                <th>Store Rating</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {storeDetailsData.map((val, i) => {
                return (
                  <tr key={i}>
                    <td>{val.store_name}</td>
                    <td>
                      {val.store_address + ", "} {val.store_city + ", "}
                      {val.store_state + ", "},{val.store_country}
                    </td>
                    <td>
                      <div className="d-flex">
                        <strong>{val.average_rating + ".0 "}</strong>
                        <Rating value={val.average_rating} readOnly />
                      </div>
                    </td>
                    <td>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#add-store-modal"
                        onClick={(e) => handleEdit(val._id, val)}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <br />
                      <button onClick={(e) => handleDeleteStore(val)}>
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h1>Add your Store</h1>
        )}
      </div>

      <div
        className="modal fade"
        id="add-store-modal"
        aria-labelledby="add-store-modal"
        aria-hidden="true"
      >
        <Model
          setStore_form_data={setStore_form_data}
          store_form_data={store_form_data}
          updateHandlerFlag={updateHandlerFlag}
          storeId={storeId}
        />
      </div>
    </>
  );
}

export default Stores;
