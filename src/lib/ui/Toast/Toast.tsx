import styled from "styled-components";

import { NORMAL } from "@/styles";
import { COLORS } from "@/utils";

const Wrapper = styled.div`
  display: flex;
  ${NORMAL};
  font-weight: 500;
  color: ${COLORS.white};
`;

const SuccessIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 16px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(/icons/ic-success-filled.svg);
`;

const ErrorIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 16px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(/icons/ic-error-filled.svg);
`;

interface Props {
  message: string;
}

export const SuccessMessage = ({ message }: Props) => {
  return (
    <Wrapper>
      <SuccessIcon /> {message}
    </Wrapper>
  );
};

export const ErrorMessage = ({ message }: Props) => {
  return (
    <Wrapper>
      <ErrorIcon /> {message}
    </Wrapper>
  );
};
