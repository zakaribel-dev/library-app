import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [query, setQuery] = React.useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
<header className="bg-gradient-to-r from-blue-100 to-red-200 shadow-lg px-6 py-4 flex flex-col sm:flex-row sm:justify-between gap-4 border-b border-blue-300">
            <nav className="flex gap-4 text-blue-600 font-medium">
                <Link to="/" className="hover:underline">Accueil</Link>
                <Link to="/advanced-search" className="hover:underline">Recherche avancée</Link>
            </nav>

            <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
                <input
                    type="text"
                    placeholder="Recherche rapide..."
                    className="border rounded-md px-3 py-1 w-full sm:w-64"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition"
                >
                    Rechercher
                </button>
            </form>
        </header>
    );
};

export default Header;
