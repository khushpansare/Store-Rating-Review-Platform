import React, { useContext, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";

import ComponentWrapper from "../../wrapper/ComponentWrapper";
import { Store_Details_Context } from "../../contexts/Store_Details_Context";
import { AuthContext } from "../../contexts/AuthContext";

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

  const { handlogout } = useContext(AuthContext);

  useEffect(() => {
    handlogout();
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
                    <div style={{ backgroundColor: "transparent" }}>
                      <Rating
                        value={val.average_rating}
                        readOnly
                        // onChange={(e, newValue) => setValue(newValue)}
                        // style={{ background: "transparent" }}
                      />
                    </div>
                    <div style={{ backgroundColor: "transparent" }}>
                      <Rating
                        key={i}
                        value={rating.id === i && rating.value}
                        onChange={(e, rate) =>
                          setRating({ value: rate, id: i })
                        }
                      />
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
