import styled from "styled-components";
import media from "./media";

export const StyledContentContainer = styled.div`
  display: ${props => (props.$flex ? "flex" : "block")};
  padding: ${({ theme }) => theme.spacings.small};
  padding-top: ${({ theme }) => theme.spacings.large};
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  flex: 1 1 auto;
`;
