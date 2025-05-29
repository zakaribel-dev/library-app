import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";

import Header from "./components/Header";
import Spinner from "./components/Spinner";

const HomePage = lazy(() => import("./features/home/HomePage"));
const SearchPage = lazy(() => import("./features/search/SearchPage"));
const BookDetailsPage = lazy(() => import("./features/book/BookDetailsPage"));
const AdvancedSearchPage = lazy(() => import("./features/advancedSearch/AdvancedSearchPage"));

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
            <Route path="/book/:type/:id" element={<BookDetailsPage />} />
            <Route path="/advanced-search" element={<AdvancedSearchPage />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
