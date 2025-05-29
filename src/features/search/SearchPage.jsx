import { useLocation } from "react-router-dom";
import { useSearchByQuery } from "./search.queries";
import BookCard from "../../components/BookCard";
import Spinner from "../../components/Spinner";

const SearchPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");

  const {
    data: books = [],
    isLoading,
    isError,
  } = useSearchByQuery(query);


 const extractIdAndType = (key) => { // openlibrary peut retourner soit un work soit un book. En gros un work sera moins précis qu'un book car 
  // un work contient des infos plus generales (titre/sujet/auteur/desc generale) alors qu'un book est plus précis (date d'édition exacte, editeur etc..)
  if (key?.startsWith("/works/")) return { id: key.split("/works/")[1], type: "work" };
  if (key?.startsWith("/books/")) return { id: key.split("/books/")[1], type: "book" };
  return { id: null, type: null };
};

  return (
    <main className="px-6 py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Résultats pour : <span className="text-blue-600">{query}</span>
      </h2>

      {isLoading && <Spinner />}
      {isError && <p className="text-red-600">Erreur lors de la recherche.</p>}
      {!isLoading && books.length === 0 && (
        <p className="text-gray-600">Aucun résultat trouvé.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
     {books.map((book) => {
        const { id: workId, type } = extractIdAndType(book.key);
        return (
          <BookCard
            key={book.key}
            title={book.title}
            author_name={book.author_name}
            coverId={book.cover_i}
            workId={workId}
            type={type}
            first_publish_year={book.first_publish_year}
            className="animate-fade-in"
          />
        );
      })}

      </div>
    </main>
  );
};

export default SearchPage;
