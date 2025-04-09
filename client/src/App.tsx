import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import GalleryPage from "@/pages/GalleryPage";
import PhotographerPage from "@/pages/PhotographerPage";
import ContactPage from "@/pages/ContactPage";


function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/photographers/:id" component={PhotographerPage} />
      <Route path="/photographers" component={() => <NotFound />} />
      <Route path="/contact" component={ContactPage} />

      <Route path="/register" component={() => <NotFound />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
