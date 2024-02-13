import styled from "styled-components";

export const Icon = styled.div<{ $src: string }>`
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.$src});
`;
