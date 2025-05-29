const BookWikiInfo = ({ wikiData, bookTitle }) => {
  if (!wikiData) return null;

  return (
    <section className="bg-blue-50 border border-blue-100 rounded-xl p-6 mt-10 shadow-sm">
      <h2 className="text-xl font-semibold text-blue-700 mb-2">Description Wikipédia</h2>
      <p className="text-gray-800">{wikiData.extract}</p>

      {wikiData.image && (
        <img
          src={wikiData.image}
          alt={`Pas d'illustration disponible pour ${bookTitle}`}
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
  );
};

export default BookWikiInfo;
