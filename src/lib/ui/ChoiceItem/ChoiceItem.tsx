import { Link } from "react-router-dom";
import styled from "styled-components";

import { COLORS } from "@/utils";
import { NORMAL } from "@/styles";

const ChoiceItemWrapper = styled.div<{ $hasIcon: boolean }>`
  width: 100%;
  max-width: 140px;
  height: 100%;
  max-height: ${(props) => (props.$hasIcon ? "180px" : "140px")};
  border-radius: 4px;
  border: 1px solid ${COLORS.black900};
  background-color: ${COLORS.white};
  cursor: pointer;
  display: inline-block;
  padding: 8px;
  &:hover {
    border: 1px solid ${COLORS.green700};
  }
`;

interface Props {
  to: string;
  choice: {
    icon?: string;
    title: string;
    desc: string;
  };
}

export const ChoiceItem = ({ to, choice }: Props) => {
  const { icon, title, desc } = choice;

  return (
    <Link to={to}>
      <ChoiceItemWrapper $hasIcon={!!icon}>
        <ChoiceItem.HeaderWrapper>
          {icon && <ChoiceItem.Icon src={icon} />}
          <ChoiceItem.Title>{title}</ChoiceItem.Title>
        </ChoiceItem.HeaderWrapper>
        <ChoiceItem.Description>{desc}</ChoiceItem.Description>
      </ChoiceItemWrapper>
    </Link>
  );
};

ChoiceItem.HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 8px 0;
`;

ChoiceItem.Icon = styled.div<{ src: string }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
`;

ChoiceItem.Title = styled.div`
  color: ${COLORS.black900};
  width: 88px;
  height: 24px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: -0.25px;
  word-wrap: break-word;
`;

ChoiceItem.Description = styled.div`
  ${NORMAL};
  color: ${COLORS.black900};
  width: 100%;
  word-wrap: break-word;
  letter-spacing: -0.1px;
`;
