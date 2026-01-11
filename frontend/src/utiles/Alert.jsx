import React, { useEffect, useState } from "react";

function Alert({ setmessage, message }) {
  const [dismiss, setdismiss] = useState(false);
  useEffect(() => {
    setdismiss(true);

    setTimeout(() => {
      setdismiss(false);
      setmessage("");
    }, 3000);
  }, []);
  return (
    <>
      {dismiss === true && (
        <div
          class="alert alert-primary alert-dismissible fade show"
          role="alert"
        >
          <strong>{message}</strong>
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </>
  );
}

export default Alert;
