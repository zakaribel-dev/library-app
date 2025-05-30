import { useQuery } from "@tanstack/react-query";
import {
  fetchWorkById,
  fetchAuthorsFromWorkObject,
} from "../../services/openLibrary";
import { fetchWikipediaData } from "../../services/wikipedia";


//https://tanstack.com/query/v4/docs/framework/react/reference/useQuery
export const useBook = (id, type) =>
  useQuery({ 
    queryKey: ["book", type, id],
    queryFn: () => fetchWorkById(id,type),
    staleTime: 1000 * 60 * 5, // cache 5 mn
    enabled: !!id,
  });

export const useBookAuthors = (book) =>
  useQuery({
    queryKey: ["authors", book?.key],
    queryFn: () => fetchAuthorsFromWorkObject(book?.authors || []),
    enabled: !!book?.authors,
    staleTime: 1000 * 60 * 10,
  });

export const useWikipedia = (title) =>
  useQuery({
    queryKey: ["wikipedia", title],
    queryFn: () => fetchWikipediaData(title),
    enabled: !!title,
    staleTime: 1000 * 60 * 10,
  });
