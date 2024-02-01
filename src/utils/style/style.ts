// 789a65 83a56f 8eb07a 99bc85(main) a4c890  b0d39b bcdfa7

/**
 * =============================================================
 * =====                     COLORS                        =====
 * =============================================================
 */
export enum COLORS {
  navy50 = "#f6f8fc",
  navy80 = "#eef2fa",
  navy100 = "#dee2f2",
  navy200 = "#c9d0e6",
  navy300 = "#b6bdd7",
  navy400 = "#8a92ba",
  navy600 = "#595e8a",
  navy800 = "#353761",
  navy900 = "#212242",
  green900 = "#789a65",
  green700 = "#83a56f",
  green500 = "#8eb07a",
  green400 = "#99bc85",
  green300 = "#a4c890",
  green200 = "#b0d39b",
  green100 = "#bcdfa7",
  mint = "#B2F5EA",
  white = "#FFFFFF",
  black800 = "#1a202c",
  black900 = "#000000",
  red300 = "#f24d6b",
  red400 = "#d92148",
  gray = "#DCDCDC",
}

/**
 * =============================================================
 * =====                     MEDIA                         =====
 * =============================================================
 */
enum MEDIA_SIZES {
  desktop = 992,
  tablet = 640,
  main = 377,
  mobile = 320,
}

type MediaLabels = keyof typeof MEDIA_SIZES;

export const media = (Object.keys(MEDIA_SIZES) as MediaLabels[]).reduce(
  (acc, label) => {
    acc[label] = `@media (min-width: ${MEDIA_SIZES[label] / 16}em)`;

    return acc;
  },
  {} as Record<MediaLabels, string>,
);

export const mediaMax = (Object.keys(MEDIA_SIZES) as MediaLabels[]).reduce(
  (acc, label) => {
    acc[label] = `@media (max-width: ${(MEDIA_SIZES[label] - 1) / 16}em)`;

    return acc;
  },
  {} as Record<MediaLabels, string>,
);

/**
 * =============================================================
 * =====                   BROWSER                         =====
 * =============================================================
 */
export const IS_BROWSWER = typeof window !== "undefined";
export const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(
  navigator.userAgent,
);
