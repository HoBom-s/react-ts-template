import styled from "styled-components";

import { COLORS, media } from "@/utils";

import type { ChildrenAlias } from "@/types";

const FormWrapper = styled.form`
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
  background-color: ${COLORS.white};

  ${media.main} {
    padding: 0 48px;
    max-wdith: 500px;
    border-radius: 4px;
    border: 1px solid ${COLORS.gray};
  }
`;

interface Props {
  children: ChildrenAlias;
}

export const Form = ({ children }: Props) => {
  return <FormWrapper>{children}</FormWrapper>;
};
