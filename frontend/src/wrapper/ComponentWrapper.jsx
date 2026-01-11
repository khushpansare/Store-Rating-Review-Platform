import React from "react";
import Navbar from "../dashboard/Navbar";
import Foter from "../dashboard/Foter";

function ComponentWrapper(props) {
  return (
    <>
      <Navbar />
      {props.flag === 1 ? (
        props.children
      ) : (
        <div className="main-page-container">{props.children}</div>
      )}
      {/* <Foter /> */}
    </>
  );
}

export default ComponentWrapper;
