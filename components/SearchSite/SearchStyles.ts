import { createGlobalStyle, css } from "styled-components";

const commonStyles = css`
  width: 600px !important;

  & .aa-Item + .aa-Item {
    margin-top: 8px;
  }

  & .found-part {
    background-color: #d2dbdf;
    color: #651fff;
  }

  @media (max-width: 680px) {
    width: auto !important;
    left: 0 !important;
  }
`;

export const SearchStyles = createGlobalStyle`
.aa-Panel {
  ${commonStyles}
  left: 50% !important;
  transform: translateX(-50%);

  @media(max-width: 680px) {
    transform: translateX(0);
  }
}
`;

export const SmallSearchStyles = createGlobalStyle`
.aa-Panel {
  ${commonStyles}
  left: initial !important;
}
`;
