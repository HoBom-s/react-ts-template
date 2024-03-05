import { useState } from "react";

export const useErrorBoundary = <ErrorType extends Error>() => {
  const [error, setError] = useState<ErrorType | null>(null);

  if (error) {
    throw error;
  }

  return setError;
};
