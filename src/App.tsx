import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PublicRouter } from "./routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PublicRouter />
    </QueryClientProvider>
  );
};

export default App;
