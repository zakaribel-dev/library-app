import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";

import Header from "./components/Header";
import Spinner from "./components/Spinner";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const BookPage = lazy(() => import("./pages/BookDetailsPage"));
const AdvancedSearchPage = lazy(() => import("./pages/AdvancedSearchPage"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Suspense fallback={<div className="flex justify-center py-10"><Spinner /></div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/book/:id" element={<BookPage />} />
            <Route path="/advanced-search" element={<AdvancedSearchPage />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
