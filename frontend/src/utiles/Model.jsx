import React from "react";
import Add_New_Store_Form from "../pages/store-owner-dashboard/Add_New_Store_Form";

function Model({
  setStore_form_data,
  store_form_data,
  updateHandlerFlag,
  storeId,
}) {
  return (
    <>
      <div className="modal-dialog ">
        <div className="modal-content">
          <div className="modal-header">
            {updateHandlerFlag === false ? (
              <h3>Modify your Store details</h3>
            ) : (
              <h3>Add Your Store</h3>
            )}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <Add_New_Store_Form
              setStore_form_data={setStore_form_data}
              store_form_data={store_form_data}
              updateHandlerFlag={updateHandlerFlag}
              storeId={storeId}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Model;
