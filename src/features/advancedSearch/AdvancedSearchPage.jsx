import { useState } from "react";
import BookCard from "../../components/BookCard";
import Spinner from "../../components/Spinner";
import { useBookSearch } from "./advancedSearch.queries";

const AdvancedSearchPage = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    subject: "",
  });

  const {
    data: results = [],
    isFetching,
    refetch,
    // je sais refetch c'est bizarre alors que ligne 27 on dit ne fetch pas tant que je l'ai pas fait manuellement..
// en fait refetch est propre à useQuery il considère que même 
// go voir https://tanstack.com/query/v4/docs/framework/react/reference/useQuery
// ici ça veut dire ne fais pas le fetch au rendu du composant,
        //  on doit le faire uniquement manuellement (handlesubmit) 
  } = useBookSearch(form, false); 

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Recherche avancée</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 space-y-4 mb-8 border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Titre</label>
            <input
              name="title"
              placeholder="ex. Le Petit Prince"
              value={form.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Auteur</label>
            <input
              name="author"
              placeholder="ex. Antoine de Saint-Exupéry"
              value={form.author}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Sujet</label>
            <input
              name="subject"
              placeholder="ex. Philosophie, Fiction..."
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Rechercher
          </button>
        </div>
      </form>

      {isFetching ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((book) => {
            const workId = book.key?.split("/works/")[1];
            return (
              <BookCard
                key={book.key}
                title={book.title}
                author_name={book.author_name}
                coverId={book.cover_i}
                workId={workId}
                type="work"
                first_publish_year={book.first_publish_year}
                className="animate-fade-in"
              />
            );
          })}
        </div>
      )}
    </main>
  );
};

export default AdvancedSearchPage;
