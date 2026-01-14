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
  const { handlePostReview, reviewData } = useContext(ReviewContext);

  useEffect(() => {
    let loggedInData = JSON.parse(localStorage.getItem("loggedInData"));

    console.log(reviewData[0]?.reviewed_by);
    if (
      (loggedInData?.loggedIn && loggedInData?.role === "Store Owner") ||
      loggedInData?.role === "System Admin"
    ) {
    }
    // handlogout();
    getStoresData();
  }, []);

  return (
    <>
      <ComponentWrapper>
        <div className="store-container">
          <h1> User_Main_Page</h1>

          <div className="d-flex justify-content-center flex-wrap">
            {storeDetailsData.map((val, i) => {
              return (
                <div className="store-card" key={i}>
                  <h2>{val.store_name}</h2>
                  <h4>{val.created_by.name}</h4>
                  <h5>
                    {val.store_address + ", "} {val.store_city + ", "}
                    {val.store_state + ", "},{val.store_country}
                  </h5>
                  <h2>
                    <div
                      className="d-flex"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <strong className="bg-transparent">
                        {val.average_rating + ".0"}
                      </strong>
                      <Rating
                        value={val.average_rating}
                        readOnly
                        style={{
                          fontSize: 35,
                        }}
                      />
                    </div>
                    {/* {console.log(reviewData[i]?.store_id === val._id) && ( */}
                    <div className="my-3">
                      <p className="text-dark p-0!">
                        <strong className="bg-transparent fs-6">
                          Rate and review
                        </strong>
                      </p>
                      <Rating
                        key={i}
                        value={rating.id === i && rating.value}
                        style={{ backgroundColor: "red" }}
                        onChange={(e, rate) =>
                          setRating({ value: rate, id: i })
                        }
                      />
                    </div>
                    {/*  )} */}
                    <div>
                      {rating.value &&
                        rating.id === i &&
                        (userDetails.user_details?.isLoggedIn &&
                        userDetails.user_details?.role === "User" ? (
                          <p>
                            <button
                              onClick={(e) =>
                                handlePostReview(val, rating, userDetails)
                              }
                            >
                              Rate the store
                            </button>
                          </p>
                        ) : (
                          <p className="error-msg">
                            <strorng>Please login post your rating</strorng>
                          </p>
                        ))}
                    </div>
                  </h2>
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
