import React from "react";
import { CompanyForm } from "../components/CompanyForm";
import { useParams, useNavigate } from "react-router-dom";
import { addCompany, editCompany } from "../features/company/companySlice";
import { useSelector, useDispatch } from "react-redux";
import { StyledTitle } from "../styledComponents/StyledTitle";

export const CompanyDetailPage = () => {
  const { id: companyId } = useParams();
  const buttonText = companyId ? "Edit Company" : "Create Company";
  const companyData = useSelector(state => state.company.companies.find(c => c.id === +companyId));
  // const token = useSelector(state => state.auth.token);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  return (
    <div>
      {companyId ? (
        <>
          <StyledTitle>Editing company</StyledTitle>
          <CompanyForm actionCreatorUpdateCompany={editCompany} companyId={companyId} buttonText={buttonText} initialState={companyData} />
        </>
      ) : (
        <>
          <StyledTitle>Creating company</StyledTitle>
          <CompanyForm actionCreatorAddCompany={addCompany} buttonText={buttonText} />
        </>
      )}
    </div>
  );
};
