import { useState } from "react";

/**
 * 가장 가까운 ErrorBoundary로 Error를 throw 하도록 한다.
 *
 * @example
 *      const throwError = useErrorBoundary();
 *
 *
 *      const SomeComponent = () => {
 *          // ...
 *          return (
 *              <button onClick={() => {
 *                  throwError(new Error("Error를 부모에게 위임."));
 *              }}>
 *                  Error throw
 *              </button>
 *          );
 *      }
 */
export const useErrorBoundary = <ErrorType extends Error>() => {
  const [error, setError] = useState<ErrorType | null>(null);

  if (error) {
    throw error;
  }

  return setError;
};
