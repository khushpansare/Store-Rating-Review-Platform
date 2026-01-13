import React from "react";

import { AuthProvider } from "./AuthContext";
import { Store_Details_Provider } from "./Store_Details_Context";
// import StoreProvider from "./StoreContext";

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <Store_Details_Provider>{children}</Store_Details_Provider>
    </AuthProvider>
  );
};

export default ContextProvider;
