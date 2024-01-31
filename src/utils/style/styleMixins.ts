import { css } from "styled-components";

/**
 * =============================================================
 * =====                     LAYOUTS                       =====
 * =============================================================
 */
export const FULL_SCREEN = css`
  width: 100vw;
  height: 100vh;
  overflow: scroll;
`;

export const FLEX_CENTER = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FLEX_ROW = css`
  display: flex;
  flex-direction: row;
`;

export const FLEX_COLUMN = css`
  display: flex;
  flex-direction: column;
`;

/**
 * =============================================================
 * =====                  COMPONENTS                       =====
 * =============================================================
 */

export const BUTTON_MID = css`
  width: 80px;
  height: 40px;
`;

export const BUTTON_BIG = css`
  width: 180px;
  height: 50px;
  margin-left: 16px;
  margin-right: 16px;
`;
