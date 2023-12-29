import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import getRoutes from "./routes";
import { useAuthStore } from "./store/auth";

const queryClient = new QueryClient();

function App() {
  const authToken = useAuthStore((store) => store.authToken);
  const router = createBrowserRouter(getRoutes(!!authToken));
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
