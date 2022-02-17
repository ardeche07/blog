import { createGlobalStyle } from "styled-components";

export const SearchStyles = createGlobalStyle`
.aa-Panel {
  width: 600px !important;
  left: 50% !important;
  transform: translateX(-50%);

  & .aa-Item + .aa-Item {
    margin-top: 8px;
  }

  & .found-part {
    background-color: #D2DBDF;
    color: #651FFF;
  }

  @media(max-width: 680px) {
    width: auto !important;
    left: 0 !important;
    transform: translateX(0);
  }
}
`;
