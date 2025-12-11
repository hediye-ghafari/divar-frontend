import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Router from "router/Router";
import defaultOptions from "configs/reactQuery";
import Layout from "layouts/Layout";

function App() {
  const queryClient = new QueryClient({ defaultOptions });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{ duration: 2500 }}
        reverseOrder={false}
      />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
