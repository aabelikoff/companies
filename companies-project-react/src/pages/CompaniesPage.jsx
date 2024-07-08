import React from "react";
import { CompanyList } from "../features/company/components/CompanyList";
import { StyledContentContainer } from "../styledComponents/StyledLayout";
import { StyledNavlinkAsButton } from "../styledComponents/StyledNavLink";
export const CompaniesPage = () => {
  return (
    <StyledContentContainer $flex>
      <StyledNavlinkAsButton to={"/companyDetail"} $width="150px">
        Add Company
      </StyledNavlinkAsButton>
      <CompanyList />
    </StyledContentContainer>
  );
};
