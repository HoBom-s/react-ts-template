import styled from "styled-components";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

import { NORMAL, SMALL } from "@/styles";
import { COLORS, FLEX_CENTER } from "@/utils";
import { SuccessMessage } from "../Toast/Toast";

const Wrapper = styled.div`
  & > div {
    width: 100%;
    display: flex;
    margin-top: 6px;
  }
`;

const InfoLabel = styled.label`
  ${SMALL};
  font-weight: bold;
`;

const InfoInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  background-color: ${COLORS.green200};
  border-radius: 4px;
  margin-top: 6px;
`;

const InfoInputText = styled.div`
  ${NORMAL};
  letter-spacing: -0.1px;
  color: ${COLORS.white};
`;

const InfoBox = styled.div`
  min-width: 80px;
  height: 40px;
  border-radius: 4px;
  padding: 10px 16px;
  background-color: ${COLORS.green500};
  ${FLEX_CENTER};
  ${NORMAL};
  color: ${COLORS.white};
  cursor: pointer;
  margin-left: 8px;
  margin-top: 6px;
`;

interface Props {
  title: string;
  text: string;
  icon?: boolean;
}

export const Info = ({ title, text, icon = true }: Props) => {
  const handleInfoBoxClick = () => {
    copy(text);
    toast.success(<SuccessMessage message={text} />, { autoClose: 2000 });
  };

  return (
    <Wrapper>
      <InfoLabel>{title}</InfoLabel>
      <div>
        <InfoInput>
          <InfoInputText>{text}</InfoInputText>
          {icon && (
            <div>
              <InfoBox onClick={handleInfoBoxClick}>COPY</InfoBox>
            </div>
          )}
        </InfoInput>
      </div>
    </Wrapper>
  );
};
