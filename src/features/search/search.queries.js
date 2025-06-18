import { useQuery } from "@tanstack/react-query";
import { searchBooksByQuery } from "../../services/openLibrary";

export const useSearchByQuery = (query) =>
  useQuery({ //https://tanstack.com/query/v4/docs/framework/react/reference/useQuery
    queryKey: ["searchBooks", query],
    queryFn: () => searchBooksByQuery(query, 10),
    enabled: !!query,// on lance searchBooksByQuery que si on a une query définie.. et non automatiquement
     cacheTime: 0,      // ← supprime le cache après utilisation
  staleTime: 0  
  });
