import { useQuery } from "@tanstack/react-query";
import { fetchRecentChanges } from "../services/openLibrary";
import BookCard from "../components/BookCard";
import Spinner from "../components/Spinner";

const HomePage = () => {
    const { data: books, isLoading, error } = useQuery({
        queryKey: ["recentChanges"],
        queryFn: () => fetchRecentChanges(10),
        staleTime: 1000 * 60 * 5, // cache 5 minutes
    });

    if (isLoading) return <Spinner />;
    if (error) return <p>Erreur lors du chargement.</p>;

    return (
        <main className="px-4 py-8 max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-8 shadow-md animate-fade-in">
                <h1 className="text-4xl font-extrabold text-blue-800 mb-2">
                    Bienvenue à la bibliothèque
                </h1>
                <p className="text-gray-600 text-lg">
                    Voici les dernières modifications de livres sur OpenLibrary.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book, i) => (
                    <BookCard key={i} {...book} className="animate-fade-in" />
                ))}
            </div>
        </main>
    );
};

export default HomePage;
