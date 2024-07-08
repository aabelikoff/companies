import React from "react";
import { Nav } from "./Nav";
import { StyledHeader } from "../styledComponents/StyledHeader";

export const Header = () => {
  return (
    <StyledHeader>
      <h1>Companies Project</h1>
      <Nav />
    </StyledHeader>
  );
};
