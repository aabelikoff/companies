import styled from "styled-components";
import media from "./media";

export const StyledButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  color: black;
  text-decoration: none;
  border: 2px solid transparent;
  border-radius: 4px;
  font-size: inherit;
  background: none;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeight.normal};

  ${media.large`
    font-size: ${({ theme }) => theme.fontSizes.medium}
    `}
  ${media.medium`
    font-size: ${({ theme }) => theme.fontSizes.small}

    `}
`;

export const StyledFormButton = styled(StyledButton)`
  max-width: ${props => props.$maxWidth};
  width: ${props => props.$width};
  justify-self: center;
  align-self: center;
  border: 2px solid ${({ theme, $color }) => $color || theme.colors.success};
  color: ${({ theme, $color }) => $color || theme.colors.success};
  transition: all 0.2s ease-in;

  &:hover {
    color: white;
    background-color: ${({ theme, $color }) => $color || theme.colors.success};
  }

  ${media.medium`
    padding: 4px 2px;
    width: 30%;

    `}
`;
export const StyledFormDeleteButton = styled(StyledFormButton)`
  border: 2px solid ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.danger};

  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.colors.danger};
  }
`;

export const StyledListItemButton = styled(StyledFormButton)`
  color: ${({ theme }) => theme.colors.danger};
  border: 2px solid;
  padding: ${({ theme }) => theme.spacings.xsmall} ${({ theme }) => theme.spacings.medium};
  border-radius: ${({ theme }) => theme.radius.large};
  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.colors.danger};
  }

  ${media.large`
    width: 50px;

    `}
  ${media.medium`
      width: 40px;
  padding: ${({ theme }) => theme.spacings.xsmall} ${({ theme }) => theme.spacings.small};

    `}
  ${media.small`
    width: 30px;
    `}
`;

export const StyledDeleteButton = styled(StyledListItemButton)`
  color: ${({ theme }) => theme.colors.danger};
  border-color: ${({ theme }) => theme.colors.danger};
  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.colors.danger};
  }
`;
export const StyledUpdateButton = styled(StyledListItemButton)`
  color: ${({ theme }) => theme.colors.success};
  border-color: ${({ theme }) => theme.colors.success};
  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.colors.success};
  }
`;

export const StyledNavLinkButton = styled(StyledButton)`
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

  ${media.large`
    font-size: ${({ theme }) => theme.fontSizes.medium}
    `}
  ${media.medium`
    font-size: ${({ theme }) => theme.fontSizes.medium}
    `}
  ${media.small`
    font-size: ${({ theme }) => theme.fontSizes.medium}
    `}
`;
