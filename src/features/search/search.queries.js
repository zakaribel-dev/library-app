import { useQuery } from "@tanstack/react-query";
import { searchBooksByQuery } from "../../services/openLibrary";

export const useSearchByQuery = (query) =>
  useQuery({ //https://tanstack.com/query/v4/docs/framework/react/reference/useQuery
    queryKey: ["searchBooks", query],
    queryFn: () => searchBooksByQuery(query),
    enabled: !!query,// on lance searchBooksByQuery que si on a une query définie.. et non automatiquement
    staleTime: 1000 * 60 * 5,
  });
