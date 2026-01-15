import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Store_Details_Context = createContext();

export const Store_Details_Provider = ({ children }) => {
  const API_base_Url = "http://localhost:5000";
  const [storeDetailsData, setstoreDetailsData] = useState([]);

  const handleAddStore = (values) => {
    axios
      .post(`${API_base_Url}/store/add`, values, {
        withCredentials: true,
      })
      .then((res) => {
        setstoreDetailsData(res.data.store_data);
        // navigate("/user");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleUpdateStore = (id, values) => {
    axios
      .patch(`${API_base_Url}/store/update/${id}`, values, {
        withCredentials: true,
      })
      .then((res) => {
        setstoreDetailsData(res.data.store_data);
        // navigate("/user");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleDeleteStore = (id) => {
    axios
      .delete(`${API_base_Url}/store/delete/${id._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setstoreDetailsData(res.data.store_data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getStoresData = () => {
    axios
      .get(`${API_base_Url}/store/all_stores_data`)
      .then((res) => {
        // console.log(res.data);
        setstoreDetailsData(res.data.store_data);
        // console.log(res.data.store_data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const stores_data_by_owner = (id) => {
    axios
      .get(`${API_base_Url}/store/${id}`)
      .then((res) => {
        // console.log(res.data.store_data);
        setstoreDetailsData(res.data.store_data);
        // console.log(res.data.store_data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const trendingStoresData = () => {
    axios
      .get(`${API_base_Url}/store/trending-store`)
      .then((res) => {})
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    // getStoresData();
    // trendingStoresData();
  }, []);

  return (
    <Store_Details_Context.Provider
      value={{
        handleAddStore,
        storeDetailsData,
        handleDeleteStore,
        handleUpdateStore,
        getStoresData,
        trendingStoresData,
        stores_data_by_owner,
      }}
    >
      {children}
    </Store_Details_Context.Provider>
  );
};
