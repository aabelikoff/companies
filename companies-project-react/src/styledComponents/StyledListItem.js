import styled from "styled-components";
import media from "./media";

export const StyledUserItem = styled.li`
  padding: ${({ theme }) => theme.spacings.small};
  border-radius: ${({ theme }) => theme.radius.small};
  box-shadow: 0 0 2px 1px ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.small};

  div:first-child {
    flex: 1 1 70%;
  }

  div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacings.small};
  }

  p {
    margin: 0;
    padding: 0;
  }

  ${media.medium`
      div:first-child {
      flex: 1 1 75%;
    }
  `}
  ${media.small`
      div:first-child {
      flex: 1 1 80%;
    }
  `}
`;
