import styled from "styled-components";

export const StyledFooter = styled.footer`
  padding: ${({ theme }) => theme.spacings.small};
  order: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.light};
  visibility: ${({ $hidden }) => ($hidden ? "hidden" : "visible")};
`;
