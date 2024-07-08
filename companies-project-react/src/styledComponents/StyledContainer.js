import styled from "styled-components";
import media from "./media";

export const StyledContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 8px;
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.large`
    font-size: ${({ theme }) => theme.fontSizes.basic_large};
  
  `}

  ${media.medium`
    font-size: ${({ theme }) => theme.fontSizes.basic_medium};

  `}
  ${media.small`
    font-size: ${({ theme }) => theme.fontSizes.basic_small};

  `}
`;
