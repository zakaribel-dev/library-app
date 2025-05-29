import { useParams } from "react-router-dom";
import { useBook, useBookAuthors, useWikipedia } from "./book.queries";
import BookCover from "./BookCover";
import BookWikiInfo from "./BookWikiInfo";

const BookDetailsPage = () => {
const { id, type } = useParams();

  const {
    data: book,
    isLoading: isBookLoading,
    error: bookError,
  } = useBook(id,type);

  const {   
    data: authors = [],
    isLoading: isAuthorsLoading,
  } = useBookAuthors(book);

  const {
    data: wikiData,
    isLoading: isWikiLoading,
    error: wikiError,
  } = useWikipedia(book?.title);

  if (isBookLoading) return <p className="text-center text-gray-500">Chargement du livre...</p>;
  if (bookError) return <p className="text-center text-red-600">Erreur de chargement</p>;
  if (!book) return null;

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <BookCover coverId={book.covers?.[0]} title={book.title} />

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
        <BookWikiInfo wikiData={wikiData} bookTitle={book.title} />
      )}

      {wikiError && (
        <p className="text-sm text-red-500 text-center mt-4">Erreur de chargement Wikipédia.</p>
      )}
    </main>
  );
};

export default BookDetailsPage;
