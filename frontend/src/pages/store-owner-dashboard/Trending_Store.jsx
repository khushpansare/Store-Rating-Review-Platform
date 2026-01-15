import React, { useContext, useEffect } from "react";

// MUI COMPONENT
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";

// CUSTOM COMPONENT
import { Store_Details_Context } from "../../contexts/Store_Details_Context";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ffc107",
  },
  "& .MuiRating-iconHover": {
    color: "#ffb300",
  },
});

function Trending_Store() {
  const { trendingStoresData, storeDetailsData } = useContext(
    Store_Details_Context
  );

  useEffect(() => {
    trendingStoresData();
  }, []);

  return (
    <>
      <div className="table-wrapper">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between py-3 px-5 header">
          <h3>Trending Store</h3>
          {/* <a
            data-bs-toggle="modal"
            data-bs-target="#add-store-modal"
            onClick={handleFormStates}
          >
            <i className="bi bi-plus-circle"></i> Add Store
          </a> */}
        </div>

        {storeDetailsData.length >= 1 ? (
          <table>
            <thead>
              <tr>
                <th>Store Name</th>
                <th>Owner Name</th>
                <th>Store Address</th>
                <th>Store Rating</th>
              </tr>
            </thead>

            <tbody>
              {storeDetailsData.map((val, i) => {
                return (
                  <tr key={i}>
                    <td>{val.store_name}</td>
                    <td>{val.created_by.name}</td>
                    <td>
                      {val.store_city + ", "}
                      {val.store_state + ", "},{val.store_country}
                    </td>
                    <td>
                      <div className="d-flex">
                        <strong>{val.average_rating + ".0 "}</strong>
                        <Rating value={val.average_rating} readOnly />
                      </div>
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
    </>
  );
}

export default Trending_Store;
