export enum COLORS {
  whilte = "#FFFFFF",
}

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

export const IS_BROWSWER = typeof window !== "undefined";
export const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(
  navigator.userAgent,
);
