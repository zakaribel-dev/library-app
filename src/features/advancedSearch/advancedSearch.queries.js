import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "../../services/openLibrary";

export const useBookSearch = (form, enabled = false) =>
  useQuery({ // https://tanstack.com/query/v4/docs/framework/react/reference/useQuery
    queryKey: ["searchBooks", form],
    queryFn: () => searchBooks(form),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
