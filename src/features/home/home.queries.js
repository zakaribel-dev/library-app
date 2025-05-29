import { useQuery } from "@tanstack/react-query";
import { fetchRecentChanges } from "../../services/openLibrary";

export const useRecentChanges = (limit = 10) =>
  useQuery({
    queryKey: ["recentChanges", limit],
    queryFn: () => fetchRecentChanges(limit),
    staleTime: 1000 * 60 * 5,
  });
