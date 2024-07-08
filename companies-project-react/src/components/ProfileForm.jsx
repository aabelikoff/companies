import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useImmer } from "use-immer";
import { useNavigate } from "react-router-dom";
import { StyledForm, StyledFormItem } from "../styledComponents/StyledForm";
import { StyledFormButton, StyledFormDeleteButton } from "../styledComponents/StyledButton";
import { removeUser } from "../features/users/usersSlice";
import { useTheme } from "styled-components";
import { PasswordField } from "./PasswordField";
import { INPUT_PATTERNS } from "../constants";

export const ProfileForm = ({
  initialState = {
    email: "",
    password: "",
    phone_number: "",
    last_name: "",
    first_name: "",
    nick_name: "",
    description: "",
    position: "",
    role: "",
  },
  actionCreatorRegister,
  actionCreatorProfileUpdate,
  actionCreatorUpdate,
  actionCreatorAdd,
  buttonText,
  userId,
}) => {
  const [formData, setFormData] = useImmer({ ...initialState });
  const token = useSelector(state => state.auth.token);
  const role = useSelector(state => state.auth.role);
  const theme = useTheme();

  const formElement = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const formData = new FormData(formElement.current);
      const formDataObject = Object.fromEntries(formData);
      if (actionCreatorRegister) {
        await dispatch(actionCreatorRegister(formDataObject));
        navigate("/login");
      } else if (actionCreatorProfileUpdate) {
        dispatch(actionCreatorProfileUpdate({ token, user: formDataObject }));
      } else if (actionCreatorUpdate) {
        dispatch(actionCreatorUpdate({ token, id: userId, userData: formDataObject }));
      } else {
        dispatch(actionCreatorAdd({ token, userData: formDataObject }));
      }
    } catch (error) {
      console.log("handle submit error", error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(draft => {
      draft[name] = value;
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const requiredValue = actionCreatorUpdate ? false : true;
  return (
    <StyledForm ref={formElement} onSubmit={handleSubmit}>
      <StyledFormItem $inputWidth="70%">
        <label htmlFor="email">Email</label>
        <input type="email" value={formData.email} name="email" id="email" placeholder="email" required={requiredValue} onChange={handleChange} />
      </StyledFormItem>
      {(actionCreatorRegister || actionCreatorAdd) && (
        <StyledFormItem $inputWidth="70%">
          <label htmlFor="password">Password</label>
          <PasswordField valueModel={formData.password} required={requiredValue} onPasswordChange={handleChange} placeholder={"min length 6"} />
        </StyledFormItem>
      )}
      <StyledFormItem $inputWidth="70%">
        <label htmlFor="phone_number">Phone number</label>
        <input
          type="text"
          name="phone_number"
          id="phone_number"
          value={formData.phone_number}
          placeholder="min 10 digits max 12 digits"
          required={requiredValue}
          onChange={handleChange}
          pattern={INPUT_PATTERNS.phone}
        />
      </StyledFormItem>
      <StyledFormItem $inputWidth="70%">
        <label htmlFor="last_name">Last name</label>
        <input type="text" name="last_name" id="last_name" value={formData.last_name} placeholder="last name" required={requiredValue} onChange={handleChange} />
      </StyledFormItem>
      <StyledFormItem $inputWidth="70%">
        <label htmlFor="first_name">First name</label>
        <input type="text" name="first_name" id="first_name" value={formData.first_name} placeholder="first name" required={requiredValue} onChange={handleChange} />
      </StyledFormItem>
      <StyledFormItem $inputWidth="70%">
        <label htmlFor="nick_name">Nick name</label>
        <input type="text" name="nick_name" id="nick_name" value={formData.nick_name} placeholder="nick name" required={requiredValue} onChange={handleChange} />
      </StyledFormItem>
      <StyledFormItem $inputWidth="70%">
        <label htmlFor="description">Descriprion</label>
        <input type="text" name="description" id="description" value={formData.description} placeholder="description" required={requiredValue} onChange={handleChange} />
      </StyledFormItem>
      <StyledFormItem $inputWidth="70%">
        <label htmlFor="position">Position</label>
        <input type="text" name="position" id="position" value={formData.position} placeholder="position" required={requiredValue} onChange={handleChange} />
      </StyledFormItem>
      <StyledFormItem $inputWidth="70%">
        <label htmlFor="role">Role</label>
        <select name="role" id="role" disabled={role === "user" || !role} value={formData.role} onChange={handleChange}>
          <option value={"user"}>User</option>
          <option value={"admin"}>Admin</option>
        </select>
      </StyledFormItem>
      <div>
        <StyledFormButton type="submit" $maxWidth="40%" $width="150px">
          {buttonText}
        </StyledFormButton>
        {userId && (
          <StyledFormDeleteButton
            $width="150px"
            onClick={() => {
              dispatch(removeUser({ token, id: userId }));
              navigate("/users");
            }}
          >
            Delete User
          </StyledFormDeleteButton>
        )}
        <StyledFormButton type="button" $width="150px" onClick={handleGoBack} $color={theme.colors.dark}>
          Go Back
        </StyledFormButton>
      </div>
    </StyledForm>
  );
};
