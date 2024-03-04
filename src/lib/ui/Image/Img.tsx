import { Suspense } from "react";
import styled from "styled-components";

import { Spinner } from "..";
import { useImageLazyLoading } from "@/lib";

interface ImageBaseProps {
  $bordered: boolean;
}

const ImageBase = styled.img<ImageBaseProps>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${(props) => (props.$bordered ? "8px" : "none")};
`;

interface ImageCache {
  __cache: {
    [src: string]: Promise<unknown> | boolean;
  };
  read: (src: string) => Promise<unknown> | boolean;
}

interface Props {
  src: string;
  placeholder: string;
  isLazy?: boolean;
  alt?: string;
  bordered?: boolean;
  bottomViewMargin?: string;
}

const imageCache: ImageCache = {
  __cache: {},
  read(src: string): Promise<unknown> | boolean {
    if (!this.__cache[src]) {
      this.__cache[src] = new Promise((resolve) => {
        const image = new Image();

        image.onload = () => {
          this.__cache[src] = true;
          resolve(this.__cache);
        };

        image.src = src;
      }).then(() => {
        this.__cache[src] = true;
      });
    }

    if (this.__cache[src] instanceof Promise) {
      throw this.__cache[src];
    }

    return this.__cache[src];
  },
};

const ImageWithSuspense = ({
  src,
  placeholder,
  isLazy = true,
  alt = "image",
  bottomViewMargin = "500px",
  bordered = false,
}: Props) => {
  const { imgRef, imgSrc } = useImageLazyLoading({
    src,
    placeholder,
    isLazy,
    bottomViewMargin,
  });

  imageCache.read(src);

  return <ImageBase ref={imgRef} src={imgSrc} alt={alt} $bordered={bordered} />;
};

export const Img = ({
  src,
  placeholder,
  alt = "image",
  isLazy = true,
  bottomViewMargin = "500px",
  bordered = false,
}: Props) => {
  return (
    <Suspense fallback={<Spinner size="sm" />}>
      <ImageWithSuspense
        isLazy={isLazy}
        src={src}
        placeholder={placeholder}
        alt={alt}
        bottomViewMargin={bottomViewMargin}
        bordered={bordered}
      />
    </Suspense>
  );
};
