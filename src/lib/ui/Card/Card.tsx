import styled from "styled-components";

import type { ChildrenAlias } from "@/types";
import { DetailsHTMLAttributes } from "react";

const CardWrapper = styled.div`
  min-width: 180px;
  width: 100%;
  max-width: 210px;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

interface Props extends DetailsHTMLAttributes<HTMLDivElement> {
  header: ChildrenAlias;
  contents: ChildrenAlias;
  footer: ChildrenAlias;
}

export const Card = (props: Props) => {
  const { header, contents, footer } = props;

  return (
    <CardWrapper>
      <div>{header}</div>
      <div>{contents}</div>
      <div>{footer}</div>
    </CardWrapper>
  );
};
