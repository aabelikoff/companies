import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  color: black;
  text-decoration: none;
  border: 2px solid transparent;
  border-radius: 4px;
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  width: ${({ $width }) => $width};
  max-width: ${({ $maxWidth }) => $maxWidth};
  transition: all 0.2s ease-in;
  &.active {
    color: white;
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 2px solid ${({ theme }) => theme.colors.secondary};
    &:hover {
      color: white;
    }
  }
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    border: 2px solid ${({ theme }) => theme.colors.secondary};
  }
`;

export const StyledNavlinkAsButton = styled(StyledNavLink)`
  color: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.secondary};

  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 2px solid ${({ theme }) => theme.colors.secondary};
  }
`;

export { StyledNavLink };
