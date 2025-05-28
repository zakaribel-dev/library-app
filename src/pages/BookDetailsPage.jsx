import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWorkById, fetchAuthorsFromWorkObject } from "../services/openLibrary";
import { fetchWikipediaData } from "../services/wikipedia";

const BookDetailsPage = () => {
  const { id } = useParams();
  const [coverUrl, setCoverUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  // livre
  const {
    data: book,
    isLoading: isBookLoading,
    error: bookError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchWorkById(id),
    staleTime: 1000 * 60 * 5,
  });

  // auteurs
  const {
    data: authors = [],
    isLoading: isAuthorsLoading,
  } = useQuery({
    queryKey: ["authors", id],
    queryFn: () => fetchAuthorsFromWorkObject(book?.authors || []),
    enabled: !!book?.authors,
    staleTime: 1000 * 60 * 10,
  });

  //  Wiki
  const {
    data: wikiData,
    isLoading: isWikiLoading,
    error: wikiError,
  } = useQuery({
    queryKey: ["wikipedia", book?.title],
    queryFn: () => fetchWikipediaData(book.title),
    enabled: !!book?.title,
    staleTime: 1000 * 60 * 10,
  });

  //  image
  if (book?.covers?.length > 0 && !coverUrl) {
    setCoverUrl(`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`);
  }

  if (isBookLoading) return <p className="text-center text-gray-500">Chargement du livre...</p>;
  if (bookError) return <p className="text-center text-red-600">Erreur de chargement</p>;
  if (!book) return null;

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {coverUrl && (
          <div className="relative w-full max-w-xs mx-auto">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
              </div>
            )}
            <img
              src={coverUrl}
              alt={`Couverture de ${book.title}`}
              className={`rounded-lg shadow w-full transition-opacity duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImageLoading(false)}
            />
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>

          {!isAuthorsLoading && authors.length > 0 && (
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Auteur(s) :</span> {authors.join(", ")}
            </p>
          )}

          {book.description ? (
            <p className="text-gray-800 mb-6">
              <span className="font-semibold">Description (Open Library):</span>{" "}
              {typeof book.description === "string"
                ? book.description
                : book.description?.value}
            </p>
          ) : (
            <p className="italic text-gray-500 mb-6">Aucune description OpenLibrary disponible.</p>
          )}
        </div>
      </div>

      {wikiData && !isWikiLoading && (
        <section className="bg-blue-50 border border-blue-100 rounded-xl p-6 mt-10 shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Description Wikipédia</h2>
          <p className="text-gray-800">{wikiData.extract}</p>
          {wikiData.image && (
            <img
              src={wikiData.image}
              alt={`Couverture Wikipedia de ${book.title}`}
              className="mt-4 rounded shadow w-40"
            />
          )}
          <p className="mt-2">
            <a
              href={wikiData.link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Voir sur Wikipedia →
            </a>
          </p>
        </section>
      )}
      {wikiError && (
        <p className="text-sm text-red-500 text-center mt-4">Erreur de chargement Wikipédia.</p>
      )}
    </main>
  );
};

export default BookDetailsPage;
