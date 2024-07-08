import styled from "styled-components";

export const StyledNav = styled.nav`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  font-size: ${({ theme }) => theme.fontSizes.small};

  div {
    font-weight: ${({ theme }) => theme.fontWeight.thin};
    display: flex;
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }
`;
