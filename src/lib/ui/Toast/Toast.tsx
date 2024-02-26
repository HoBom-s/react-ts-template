import styled from "styled-components";

import { NORMAL, SMALL } from "@/styles";
import { COLORS } from "@/utils";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  ${NORMAL};
  font-weight: 500;
  color: ${COLORS.white};
`;

const SuccessContents = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 16px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(/icons/ic-success-filled.svg);
`;

const ErrorContents = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 16px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(/icons/ic-error-filled.svg);
`;

const Text = styled.p`
  ${SMALL};
  color: ${COLORS.black800};
`;

interface Props {
  message: string;
}

export const SuccessMessage = ({ message }: Props) => {
  return (
    <Wrapper>
      <SuccessContents /> <Text>{message}</Text>
    </Wrapper>
  );
};

export const ErrorMessage = ({ message }: Props) => {
  return (
    <Wrapper>
      <ErrorContents /> <Text>{message}</Text>
    </Wrapper>
  );
};
