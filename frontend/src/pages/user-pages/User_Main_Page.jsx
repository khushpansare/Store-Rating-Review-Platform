import React, { useContext, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";

import ComponentWrapper from "../../wrapper/ComponentWrapper";
import { Store_Details_Context } from "../../contexts/Store_Details_Context";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ReviewContext } from "../../contexts/ReviewContext";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ffc107",
  },
  "& .MuiRating-iconHover": {
    color: "#ffb300",
  },
});

function User_Main_Page() {
  const [rating, setRating] = useState({
    value: 0,
    id: null,
  });
  const { getStoresData, storeDetailsData } = useContext(Store_Details_Context);
  const { handlogout, userDetails } = useContext(AuthContext);
  const { handlePostReview, reviewData, getReviews } =
    useContext(ReviewContext);

  useEffect(() => {
    let loggedInData = JSON.parse(localStorage.getItem("loggedInData"));

    if (loggedInData?.loggedIn) {
      if (
        loggedInData?.role === "Store Owner" ||
        loggedInData?.role === "System Admin"
      ) {
        handlogout();
      }
    }
  }, []);

  return (
    <>
      <ComponentWrapper>
        <div className="store-container">
          <h1> User_Main_Page</h1>

          <div className="d-flex justify-content-center flex-wrap">
            {storeDetailsData.map((val, i) => {
              let indexArr = "";
              reviewData.map((r_val, j) => {
                if (
                  reviewData[j]?.store_id === val._id &&
                  reviewData[j]?.reviewed_by === userDetails.user_details?._id
                ) {
                  indexArr = reviewData[j];
                }
              });
              return (
                <div className="store-card" key={i}>
                  <h2>{val.store_name}</h2>
                  <h4>{val.created_by.name}</h4>
                  <h5>
                    {val.store_address + ", "} {val.store_city + ", "}
                    {val.store_state + ", "},{val.store_country}
                  </h5>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <h2>
                      <strong className="bg-transparent">
                        {val.average_rating + ".0"}
                      </strong>
                    </h2>
                    <Rating
                      value={val.average_rating}
                      readOnly
                      style={{
                        fontSize: 35,
                      }}
                    />
                  </div>

                  <div className="my-3">
                    <p className="text-dark p-0!">
                      <strong className="bg-transparent fs-6">
                        {indexArr
                          ? `You rate this store ${" " + indexArr?.rating}.0`
                          : "Rate and review"}
                      </strong>
                    </p>

                    <Rating
                      key={i}
                      value={
                        rating.id === i && rating.value
                          ? rating.value
                          : val?._id === indexArr?.store_id && indexArr?.rating
                      }
                      onChange={(e, rate) => setRating({ value: rate, id: i })}
                    />
                  </div>

                  <div>
                    {userDetails.user_details?.isLoggedIn &&
                    userDetails.user_details?.role === "User" &&
                    rating.value &&
                    rating.id === i ? (
                      <button
                        onClick={(e) =>
                          handlePostReview(val, rating, userDetails)
                        }
                      >
                        Rate the store
                      </button>
                    ) : (
                      <p className="error-msg">
                        <strorng className="bg-transparent">
                          Please login to post your rating
                        </strorng>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ComponentWrapper>
    </>
  );
}

export default User_Main_Page;
