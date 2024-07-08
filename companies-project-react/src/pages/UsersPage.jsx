import React from "react";
import { NavLink } from "react-router-dom";
import { UsersList } from "../features/users/components/UsersList";
import { StyledContentContainer } from "../styledComponents/StyledLayout";
import { StyledNavlinkAsButton } from "../styledComponents/StyledNavLink";

export const UsersPage = () => {
  return (
    <StyledContentContainer $flex>
      <StyledNavlinkAsButton to={"/userDetail"} $width="150px">
        Add User
      </StyledNavlinkAsButton>
      <UsersList />
    </StyledContentContainer>
  );
};
