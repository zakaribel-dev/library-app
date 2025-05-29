import { useState } from "react";

const BookCover = ({ coverId, title }) => {
  const [imageLoading, setImageLoading] = useState(true);

  if (!coverId) return null;

  const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;

  return (
    <div className="relative w-full max-w-xs mx-auto">
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
        </div>
      )}
      <img
        src={coverUrl}
        alt={`Couverture de ${title}`}
        className={`rounded-lg shadow w-full transition-opacity duration-300 ${
          imageLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setImageLoading(false)}
      />
    </div>
  );
};

export default BookCover;
