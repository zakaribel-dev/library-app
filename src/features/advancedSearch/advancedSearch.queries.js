import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "../../services/openLibrary";

export const useBookSearch = (form, enabled = false) =>
  useQuery({
    queryKey: ["searchBooks", form],
    queryFn: () => searchBooks(form),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
