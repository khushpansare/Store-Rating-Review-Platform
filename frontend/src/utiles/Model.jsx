import React from "react";
import Add_New_Product from "../pages/admin-dashboard/Add_New_Product";

function Model({ setProduct_form_data, product_form_data }) {
  return (
    <>
      {/* <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      > */}
      <div className="modal-dialog ">
        <div className="modal-content">
          <div className="modal-header">
            {product_form_data.productName ? (
              <h3>Modify your Product</h3>
            ) : (
              <h3>Add Your Product</h3>
            )}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <Add_New_Product
              setProduct_form_data={setProduct_form_data}
              product_form_data={product_form_data}
            />
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Model;
