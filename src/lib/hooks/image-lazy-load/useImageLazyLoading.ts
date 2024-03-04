import { useEffect, useRef, useState } from "react";

import { useObserver } from "..";

interface Params {
  src: string;
  placeholder: string;
  isLazy: boolean;
  bottomViewMargin: string;
}

export const useImageLazyLoading = ({
  src,
  placeholder,
  isLazy,
  bottomViewMargin = "500px",
}: Params) => {
  const [imgSrc, setImgSrc] = useState<string>(isLazy ? placeholder : src);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const { observer } = useObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          const img = new Image();

          img.onload = () => {
            setImgSrc(src);
          };
        }
      });
    },
    {
      rootMargin: `0px 0px ${bottomViewMargin} 0px`,
      threshold: 0.5,
    },
  );

  useEffect(() => {
    const imageRef = imgRef.current;

    if (!isLazy) {
      setImgSrc(src);

      return;
    }

    if (imageRef && observer) {
      if (imageRef) {
        observer.observe(imageRef);
      }
    }

    return () => {
      if (imageRef && observer) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, bottomViewMargin, isLazy, observer]);

  return {
    imgSrc,
    imgRef,
  };
};
