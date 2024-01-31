import { InputHTMLAttributes } from "react";
import styled from "styled-components";

import { NORMAL } from "@/styles";

const InputStyle = styled.input`
  ${NORMAL};
  width: 100%;
  min-height: 40px;
  box-sizing: border-box;
  border: 1px solid black;
  padding: 10px 16px;
  border-radius: 4px;
  background-color: var(--white);
`;

export const Input = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return <InputStyle {...props} />;
};
