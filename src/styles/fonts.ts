import { css } from "styled-components";

/**
 * =============================================================
 * =====                     FONTS                         =====
 * =============================================================
 */
export const COMMON = css`
  font-style: normal;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-rendering: optimizelegibility;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
`;

export const TITLE = css`
  height: 32px;
  color: inherit;
  font-size: 24px;
  line-height: 1.33;
  letter-spacing: -0.25px;
`;

export const SMALL = css`
  ${COMMON};
  font-size: 12px;
  line-height: normal;
`;

export const NORMAL = css`
  ${COMMON};
  font-size: 14px;
  line-height: 1.43;
`;

export const BIG = css`
  ${COMMON};
  font-size: 18px;
  line-height: 1.33;
  letter-spacing: -0.25px;
`;

export const XBIG = css`
  height: 32px;
  font-size: 24px;
  line-height: 1.33;
  letter-spacing: -0.25px;
`;
