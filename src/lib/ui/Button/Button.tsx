import { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";

import { FLEX_CENTER } from "@/utils";

const MIDDLE = css`
  width: 80px;
  min-height: 40px;
`;

const LARGE = css`
  width: 180px;
  min-height: 50px;
`;

const sizes = {
  md: MIDDLE,
  lg: LARGE,
};

const ButtonStyle = styled.button<Props>`
  ${FLEX_CENTER};
  cursor: pointer;
  height: auto;
  min-height: 40px;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  ${(props) => (props.size ? sizes[props.size] : "")}
`;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "md" | "lg";
}

export const Button = ({ children, ...props }: Props) => {
  return (
    <ButtonStyle type="button" {...props}>
      {children}
    </ButtonStyle>
  );
};
