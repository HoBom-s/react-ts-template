import { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";

import { FLEX_CENTER, COLORS } from "@/utils";

const MIDDLE = css`
  width: 80px;
  min-height: 40px;
`;

const LARGE = css`
  width: 180px;
  min-height: 50px;
`;

const PRIMARY = css`
  color: ${COLORS.green400};
  border: 1px solid ${COLORS.green400};
  background-color: ${COLORS.white};
`;

const sizes = {
  md: MIDDLE,
  lg: LARGE,
};

const ButtonStyle = styled.button<Props>`
  ${FLEX_CENTER};
  border: none;
  height: auto;
  cursor: pointer;
  min-height: 40px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 6px;
  color: ${COLORS.white};
  ${(props) =>
    props.$primary
      ? PRIMARY
      : css`
          background-color: ${COLORS.green400};
        `};
  ${(props) => (props.size ? sizes[props.size] : "")}
`;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  $primary?: boolean;
  size?: "md" | "lg";
}

export const Button = ({ children, ...props }: Props) => {
  return (
    <ButtonStyle type="button" {...props}>
      {children}
    </ButtonStyle>
  );
};
