import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PublicRouter } from "./routes";
import { ErrorBoundary } from "./lib";

const RETRY_COUNT: number = 0;
const STALE_TIME: number = 1 * 60 * 1000;
const GC_TIME: number = 5 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: RETRY_COUNT,
      staleTime: STALE_TIME,
      gcTime: GC_TIME,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary fallback={() => <div>Error !</div>}>
      <QueryClientProvider client={queryClient}>
        <PublicRouter />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
