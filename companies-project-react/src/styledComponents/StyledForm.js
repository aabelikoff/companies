import styled from "styled-components";
import media from "./media";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.small};
  padding: ${({ theme }) => theme.spacings.medium};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radius.small};
  max-width: ${({ $maxWidth }) => $maxWidth || "80%"};
  margin: ${({ theme }) => theme.spacings.large} auto;
  background-color: ${({ theme }) => theme.colors.light};

  & div:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacings.small};
    button {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const StyledFormItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.small};
  margin-bottom: ${({ $marginBottom, theme }) => $marginBottom && theme.spacings.medium};
  position: relative;
  button {
    all: unset;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    width: 20px;
    height: 20px;
    font-size: 12px;
    position: absolute;
    right: 2px;
    top: 50%;
    transform: translateY(-50%);
  }
  label {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: ${({ $inputWidth }) => `calc(100% - ${$inputWidth})`};
    color: ${({ theme, $labelColor }) => $labelColor || theme.colors.success};
    font-weight: ${({ theme }) => theme.fontWeight.normal};
  }
  input,
  textarea,
  select {
    font-family: "Montserrat", sans-serif;
    box-sizing: border-box;
    width: ${({ $inputWidth }) => $inputWidth};
    background-color: ${({ theme }) => theme.colors.light};
    border: 2px solid ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.radius.small};
    outline: none;
    padding: ${({ theme }) => theme.spacings.xsmall};
    display: block;
    flex: 1 1 auto;
    &:active,
    &:focus {
      border: 2px solid ${({ theme }) => theme.colors.success};
      background-color: white;
    }
    &:invalid {
      border-color: ${({ theme }) => theme.colors.danger};
    }

    ${media.large`
    font-size: ${({ theme }) => theme.fontSizes.medium};
  `}
    ${media.medium`
    font-size: ${({ theme }) => theme.fontSizes.small};
  `}
  }
`;
