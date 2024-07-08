import styled from "styled-components";
import media from "./media";

export const StyledList = styled.ul`
  margin: 0 auto;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.small};
  width: ${({ $width }) => $width};

  ${media.small`
    width: 99%;
  `}
`;
