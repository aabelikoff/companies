import styled from "styled-components";
import media from "./media";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 8px 0px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 16px);
  max-width: 800px;
  opacity: 1;
  background-color: white;

  h1 {
    margin: 0;
    font-size: 1.6em;
    width: 100%;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.danger};
  }

  ${media.small`
    h1{
      font-size: 1.2em;
      width: 40%;
    }
  
    `}
`;
