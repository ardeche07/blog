import { ComponentProps } from "react";
import styled from "styled-components";

import { all, StyledSystemProps } from "components/system";

export const Grid = styled("div")<StyledSystemProps>(
  {
    display: "grid",
    minWidth: 0,
  },
  all
);

export type GridProps = ComponentProps<typeof Grid>;

export default Grid;
