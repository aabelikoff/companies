import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authentification/authSlice";
import { StyledNavLink } from "../styledComponents/StyledNavLink.js";
import { StyledNav } from "../styledComponents/StyledNav.js";
import { StyledNavLinkButton } from "../styledComponents/StyledButton.js";

export const Nav = () => {
  const isUserLogged = useSelector(state => state.auth.isLogged);
  const role = useSelector(state => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <StyledNav>
      {!isUserLogged ? (
        <div>
          <StyledNavLink to={"/signup"}>Sign Up</StyledNavLink>
          <StyledNavLink to={"/login"}>Sign In</StyledNavLink>
        </div>
      ) : (
        <div>
          {role === "admin" && <StyledNavLink to={"/users"}>Users</StyledNavLink>}
          <StyledNavLink to={"/companies"}>Companies</StyledNavLink>
          <StyledNavLink to={"/profile"}>Profile</StyledNavLink>
          <StyledNavLinkButton
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          >
            Log Out
          </StyledNavLinkButton>
        </div>
      )}
    </StyledNav>
  );
};
