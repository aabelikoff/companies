import { css } from "styled-components";

const size = {
  large: "800px",
  medium: "650px",
  small: "500px",
};

const media = {
  large: (...args) => css`
    @media screen and (max-width: ${size.large}) {
      ${css(...args)}
    }
  `,
  medium: (...args) => css`
    @media screen and (max-width: ${size.medium}) {
      ${css(...args)}
    }
  `,
  small: (...args) => css`
    @media screen and (max-width: ${size.small}) {
      ${css(...args)}
    }
  `,
};

export default media;
