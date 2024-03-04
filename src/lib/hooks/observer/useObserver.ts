type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

export const useObserver = (
  cb: ObserverCallback,
  options: IntersectionObserverInit,
) => {
  const observer: IntersectionObserver = new IntersectionObserver(cb, options);

  return {
    observer,
  };
};
