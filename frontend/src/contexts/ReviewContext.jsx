import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const ReviewContext = createContext();

export const Review_Context_Provider = ({ children }) => {
  const API_base_Url = "http://localhost:5000";

  const [reviewData, setReviewData] = useState([]);
  const { userDetails } = useContext(AuthContext);

  const getReviews = () => {
    // userDetails.user_details?._id;
    axios
      .get(
        `${API_base_Url}/review`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setReviewData(res.data.review_details);
        console.log(res.data.review_details);
        // navigate("/store-owner");
      })
      .catch((err) => {
        console.log(err.response);
        // setUserDetails(err.response.data);
      });
  };

  const handlePostReview = (store, rating, userDetails) => {
    const values = {
      rating: rating.value,
      store_id: store._id,
      reviewed_by: userDetails.user_details?._id,
    };

    axios
      .post(`${API_base_Url}/review/add`, values, {
        withCredentials: true,
      })
      .then((res) => {
        // setUserDetails(res.data);
        console.log(res.data);
        // navigate("/store-owner");
      })
      .catch((err) => {
        console.log(err.response);
        // setUserDetails(err.response.data);
      });
  };

  const handleUpdateReview = (values) => {
    console.log("handleUpdateReview");
    // axios
    //   .post(`${API_base_Url}/store-owner/login`, values, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     setUserDetails(res.data);
    //     // console.log(res.data.user_details);
    //     navigate("/store-owner");
    //     const { isLoggedIn, _id, role } = res.data.user_details;
    //     localStorage.setItem(
    //       "loggedInData",
    //       JSON.stringify({
    //         loggedIn: isLoggedIn,
    //         id: _id,
    //         role: role,
    //       })
    //     );
    //   })
    //   .catch((err) => {
    //     // console.log(err.response.data);
    //     setUserDetails(err.response.data);
    //   });
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <ReviewContext.Provider
      value={{ handlePostReview, handleUpdateReview, reviewData }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
