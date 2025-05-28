import axios from "axios";

const extractId = (key, type) =>
  key?.startsWith(`/${type}/`) ? key.split(`/${type}/`)[1] : null;

export const fetchRecentChanges = async (limit = 10) => {
  const res = await axios.get(`https://openlibrary.org/recentchanges.json?limit=200`);
  const changes = res.data;

  const targets = changes
    .map((entry) => {
      const change = entry.changes.find((c) =>
        c.key?.startsWith("/books/") || c.key?.startsWith("/works/")
      );
      if (!change) return null;

      const isBook = change.key.startsWith("/books/");
      const id = extractId(change.key, isBook ? "books" : "works");

      return {
        type: isBook ? "book" : "work",
        id,
        timestamp: entry.timestamp,
      };
    })
    .filter(Boolean); // on dégage les results null

  const results = await Promise.all(
    targets.map(async ({ type, id, timestamp }) => {
      try {
        const url = `https://openlibrary.org/${type}s/${id}.json`;
        const res = await axios.get(url);
        const data = res.data;

        const workId =
          type === "book"
            ? data.works?.[0]?.key?.split("/works/")[1]
            : id;

        const title = data.title;
        const coverId = data.covers?.[0] || null;

        return {
          workId,
          title,
          coverId,
          timestamp,
        };
      } catch {
        return null;
      }
    })
  );

  return results.filter(Boolean).slice(0, limit);
};




export const fetchWorkById = async (id) => {
  const res = await axios.get(`https://openlibrary.org/works/${id}.json`);
  return res.data;
};

// recup les noms  d'authors à partir d'un tableau d'authors
export const fetchAuthorsFromWorkObject = async (authors = []) => {
  const names = await Promise.all(
    authors.map(async (a) => {
      const res = await axios.get(`https://openlibrary.org${a.author.key}.json`);
      return res.data.name;
    })
  );
  return names;
};

export const searchBooks = async ({ title, author, subject }) => {
  const params = new URLSearchParams();
  if (title) params.append("title", title);
  if (author) params.append("author", author);
  if (subject) params.append("subject", subject);

  const res = await axios.get(`https://openlibrary.org/search.json?${params}`);
  return res.data.docs;
};

export const searchBooksByQuery = async (query) => {
  const res = await axios.get(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`
  );
  return res.data.docs;
};
