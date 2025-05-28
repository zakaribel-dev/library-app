import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import React from "react";

const BookCard = ({ title, author_name, coverId, workId, first_publish_year }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const imageUrl = useMemo(() => {
    return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null;
  }, [coverId]);

  return (
    <div className="border border-gray-300 rounded-xl p-4 w-64 shadow hover:shadow-md transition relative">
      <h3 className="text-lg font-semibold mb-2">
        <Link to={`/book/${workId}`} className="text-blue-600 hover:underline">
          {title}
        </Link>
      </h3>

      {author_name && (
        <p className="text-sm text-gray-700 mb-1">
          {author_name.join(", ")}
        </p>
      )}

      {first_publish_year && (
        <p className="text-sm text-gray-500 mb-2">
          Publié en {first_publish_year}
        </p>
      )}

      <div className="relative w-full">
        {imageLoading && imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-600"></div>
          </div>
        )}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Couverture de ${title}`}
            onLoad={() => setImageLoading(false)}
            className={`w-full h-auto rounded transition-opacity duration-300 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <div className="w-full h-[150px] bg-gray-100 rounded flex items-center justify-center text-gray-400">
            Pas de couverture
          </div>
        )}
      </div>
    </div>
  );
};

// empeche rerenders inutiles si les props ne changent pas (par exemple si le composant parent se rerender pour je nsais quel raison)
export default React.memo(BookCard);
