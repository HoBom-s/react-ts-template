import { useState } from "react";

/**
 * ErrorBoundary에서 비동기 요청 작업 시
 * Error를 Catch할 수 있도록 해주는 Custom hook.
 */
export const useAsyncError = () => {
  const [_, setError] = useState<Error | null>(null);

  const throwAsyncError = (error: Error) => {
    setError(() => {
      throw error;
    });
  };

  return {
    throwAsyncError,
  };
};
