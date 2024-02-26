import { COLORS } from "@/utils";
import styled from "styled-components";

export const BreadCrumbs = styled.ul<{ $seperator?: string }>`
  padding: 0;
  list-styled: none;

  & > li:after {
    content: "${(props) => props?.$seperator || "/"}";
    padding: 0 8px;
  }
`;

export const Crumb = styled.li`
  display: inline-block;

  a {
    color: ${COLORS.black900};
    text-decoration: none;
    &:hover,
    &:active {
      text-decorator: underline;
    }
  }

  &:last-of-type:after {
    content: "";
    padding: 0;
  }
`;
