import styled from "styled-components";

export const StyledInfoParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.info};
  display: ${({ $inline }) => $inline && "inline"};
`;
