import React from "react";

function FormErrors(props) {

function checkFormErrors () {
        if (props.formErrors.length > 0) {
          return (
            <p className="formErrors">
              {props.formErrors}
            </p>
          );
        } else {
          return "";
        }
      }
  return (
    <div>
      {checkFormErrors()}
    </div>
  );
}

export default FormErrors;
