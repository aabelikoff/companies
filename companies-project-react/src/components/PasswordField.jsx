import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { StyledFormItem } from "../styledComponents/StyledForm";

export const PasswordField = ({ valueModel, required, onPasswordChange, placeholder }) => {
  const [inputType, setInputType] = useState("password");

  const handleClick = e => {
    setInputType(prev => {
      if (prev === "password") {
        return "text";
      }
      return "password";
    });
  };

  return (
    <>
      <input type={inputType} value={valueModel} name="password" id="password" placeholder={placeholder} minLength="6" required={required} onChange={onPasswordChange} />
      <button type="button" onClick={handleClick}>
        {inputType === "password" ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
      </button>
    </>
  );
};
