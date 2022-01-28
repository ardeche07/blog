import { ChangeEvent, ReactNode, useCallback } from "react";
import css from "@styled-system/css";
import styled from "styled-components";
import { BoxProps } from "components/Box";
import Icon from "components/Icon";
import { all, transition, StyledSystemProps } from "components/system";

interface CheckboxProps {
  checked: boolean;
  children?: ReactNode;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}

export function Checkbox({
  checked,
  onChange,
  children,
  disabled,
  ...props
}: CheckboxProps & BoxProps) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.checked);
    },
    [onChange]
  );

  return (
    <StyledWrapper {...props}>
      <StyledCheckbox
        as="input"
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={handleChange}
      />
      <StyledSquare mr={children ? "2" : "0"}>
        <StyledIcon name="check" size="sm" />
      </StyledSquare>
      {children}
    </StyledWrapper>
  );
}

const StyledCheckbox = styled("input")(
  css({
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
  })
);

const StyledIcon = styled(Icon)(
  css({
    color: "currentColor",
    opacity: 0,
    lineHeight: 0,
    transition: transition([["opacity", "interaction"]]),
  })
);

const StyledSquare = styled("div")<StyledSystemProps>(
  css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    width: 24,
    height: 24,
    border: "1px solid currentColor",
    bg: "white",
    color: "light-gray",
    transition: transition([
      ["borderColor", "interaction"],
      ["color", "interaction"],
    ]),
    borderRadius: "default",
    [`${StyledCheckbox}:disabled + &`]: {
      pointerEvents: "none",
      bg: "lightest-gray",
    },
    [`${StyledCheckbox}:focus + &`]: {
      color: "dark-purple",
    },
    [`${StyledCheckbox}:checked + & ${StyledIcon}`]: {
      opacity: 1,
    },
    [`${StyledCheckbox}:checked:not(:disabled) + &`]: {
      color: "dark-purple",
    },
  }),
  all
);

const StyledWrapper = styled("label")<StyledSystemProps>(
  css({
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    cursor: "pointer",
  }),
  all
);
