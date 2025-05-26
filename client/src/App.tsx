import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import DemoFilters from "@/pages/demo-filters";

// Importar utilidades de prueba en desarrollo
if (import.meta.env.DEV) {
  import("@/utils/testBackend");
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/demo-filters" component={DemoFilters} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
