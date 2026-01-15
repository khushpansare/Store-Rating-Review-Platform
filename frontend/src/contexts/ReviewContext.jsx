import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Store_Details_Context } from "./Store_Details_Context";

export const ReviewContext = createContext();

export const Review_Context_Provider = ({ children }) => {
  const API_base_Url = "http://localhost:5000";

  const [reviewData, setReviewData] = useState([]);
  const { userDetails } = useContext(AuthContext);
  const { getStoresData } = useContext(Store_Details_Context);

  const getReviews = async () => {
    const review_data = await axios.get(
      `${API_base_Url}/review`,
      {},
      {
        withCredentials: true,
      }
    );
    setReviewData(review_data.data.review_details);
    getStoresData();
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
        getReviews();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleUpdateReview = (e, review, rating) => {
    const values = {
      rating: rating.value,
      store_id: review.store_id,
    };

    axios
      .patch(`${API_base_Url}/review/update/${review._id}`, values, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        getReviews();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <ReviewContext.Provider
      value={{ handlePostReview, handleUpdateReview, reviewData, getReviews }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
