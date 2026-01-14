import React from "react";

import { AuthProvider } from "./AuthContext";
import { Store_Details_Provider } from "./Store_Details_Context";
import { Review_Context_Provider } from "./ReviewContext";
// import StoreProvider from "./StoreContext";

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <Store_Details_Provider>
        <Review_Context_Provider>{children}</Review_Context_Provider>
      </Store_Details_Provider>
    </AuthProvider>
  );
};

export default ContextProvider;
