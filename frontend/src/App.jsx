import { useState } from "react";
import PageRoutes from "./routes/pageRoutes";
import ContextProvider from "./contexts/ContextProvider";

function App() {
  return (
    <>
      <ContextProvider>
        <PageRoutes />
      </ContextProvider>
    </>
  );
}

export default App;
