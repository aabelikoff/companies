import React, { Children, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useImmer } from "use-immer";
import { useNavigate } from "react-router-dom";
import { StyledForm, StyledFormItem } from "../styledComponents/StyledForm";
import { StyledFormButton, StyledFormDeleteButton } from "../styledComponents/StyledButton";
import { removeCompany } from "../features/company/companySlice";
import { useTheme } from "styled-components";
import { INPUT_PATTERNS } from "../constants";

export const CompanyForm = ({
  initialState = {
    name: "",
    address: "",
    fieldOfActivity: "", // Обязательное поле, не может быть null
    numberOfEmployees: "", //number
    description: "",
    type: "",
  },
  actionCreatorAddCompany,
  actionCreatorUpdateCompany,
  companyId,
  buttonText,
}) => {
  const [formData, setFormData] = useImmer({ ...initialState });
  const token = useSelector(state => state.auth.token);

  const formElement = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const requiredValue = actionCreatorUpdateCompany ? false : true;

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(formElement.current);
    const formDataObject = Object.fromEntries(formData);

    formDataObject.numberOfEmployees = isNaN(parseInt(formDataObject.numberOfEmployees)) ? 0 : parseInt(formDataObject.numberOfEmployees);
    if (actionCreatorAddCompany) {
      console.log("Form Data Object:", formDataObject);
      await dispatch(actionCreatorAddCompany({ token, companyData: formDataObject }));
      navigate("/companies");
    } else {
      dispatch(actionCreatorUpdateCompany({ token, id: companyId, companyData: formDataObject }));
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

  return (
    <StyledForm ref={formElement} onSubmit={handleSubmit}>
      <StyledFormItem $inputWidth="70%">
        <label htmlFor="name">Company name</label>
        <input type="text" value={formData.name} name="name" id="name" placeholder="Company Name" required={requiredValue} onChange={handleChange} />
      </StyledFormItem>
      <StyledFormItem $inputWidth="70%">
        <label htmlFor="address">Company address</label>
        <input type="text" value={formData.address} name="address" id="address" placeholder="Company Address" required={requiredValue} onChange={handleChange} />
      </StyledFormItem>
      <StyledFormItem $inputWidth="70%">
        <label htmlFor="fieldOfActitvity">Field of activity</label>
        <input
          type="text"
          name="fieldOfActivity"
          id="fieldOfActivity"
          value={formData.fieldOfActivity}
          placeholder="Field of Activity"
          required={requiredValue}
          onChange={handleChange}
        />
      </StyledFormItem>
      <StyledFormItem $inputWidth="70%">
        <label htmlFor="numberOfEmployees">Number of employees</label>
        <input
          type="text"
          name="numberOfEmployees"
          id="numberOfEmployees"
          value={formData.numberOfEmployees}
          placeholder="Number of Employees"
          required={requiredValue}
          onChange={handleChange}
          pattern={INPUT_PATTERNS.numberOfEmployees}
        />
      </StyledFormItem>
      <StyledFormItem $inputWidth="70%">
        <label htmlFor="description">Descriprion</label>
        <textarea name="description" id="description" value={formData.description} placeholder="Description" required={requiredValue} onChange={handleChange}></textarea>
      </StyledFormItem>

      <StyledFormItem $inputWidth="70%">
        <label htmlFor="type">Company type</label>
        <input type="text" name="type" id="type" value={formData.type} placeholder="Company Type" required={requiredValue} onChange={handleChange} />
      </StyledFormItem>
      <div>
        <StyledFormButton type="submit" $maxWidth="40%" $width="150px">
          {buttonText}
        </StyledFormButton>
        {companyId && (
          <StyledFormDeleteButton
            $width="150px"
            onClick={() => {
              dispatch(removeCompany({ token, id: +companyId }));
              navigate("/companies");
            }}
          >
            Delete Company
          </StyledFormDeleteButton>
        )}
        <StyledFormButton type="button" $width="150px" onClick={handleGoBack} $color={theme.colors.dark}>
          Go Back
        </StyledFormButton>
      </div>
    </StyledForm>
  );
};
