import axios from "axios";



// OpenLibrary retourne parfois des "books" et parfois des "works"
// - "work" = une œuvre abstraite (ex: *Le Petit Prince*), identifiée par OLxxxxW
// - "book" = une édition spécifique imprimée (ex: Gallimard 1971), identifiée par OLxxxxM
// ca dépend de l'API utilisée (ex: search.json → work / recentchanges.json → book ou work)
// Il faut donc toujours extraire à la fois l'id et le type pour construire l'URL correcte :
//    https://openlibrary.org/works/OLxxxW.json    ← pour un work
//    https://openlibrary.org/books/OLxxxM.json    ← pour un book






// extrait l'id de la key comme "/books/OL12345M" par exemple donc ce qui est xtrait -> "OL12345M"
const extractId = (key) => {
  if (key.startsWith("/books/")) {
    return { type: "book", id: key.split("/books/")[1] };
  }
  if (key.startsWith("/works/")) {
    return { type: "work", id: key.split("/works/")[1] };
  }
  return null;
};

// recup des derniers changements OpenLibrary
export const fetchRecentChanges = async (limit = 10) => {
  try {
    const res = await axios.get(
      "https://openlibrary.org/recentchanges.json?limit=80" // limite de 80 car les changements sont rares donc 
      // on va en charger pas mal pour que ça match avec mes conditions ci dessous
    );
    const allChanges = res.data;
    const results = [];

    for (const entry of allChanges) { // for car avec un promise.all jepeux pas couper la boucle aune fois la limit atteinte
      const change = entry.changes.find(
        (c) => c.key?.startsWith("/books/") || c.key?.startsWith("/works/") // ici j'essaie de chercher un changemeht qui concerne un book ou un work
      );

      if (!change) continue; // si ya pas sur une itération bah on continue et ainsi de suite

      const parsed = extractId(change.key);
      if (!parsed) continue;

      const { type, id } = parsed;

      try {
        const detailRes = await axios.get(
          `https://openlibrary.org/${type}s/${id}.json`
        );
        const detail = detailRes.data;

        const title = detail.title;
        const coverId = detail.covers?.[0];

        if (!coverId) continue; // si pas de cover image passe à la valeur suivante 


        results.push({
          title,
          coverId,
          workId: id,
          timestamp: entry.timestamp,
          type,
        });
      } catch {
        continue;
      }


      if (results.length >= limit) break;
    }

    return results;
  } catch (err) {
    console.error("erreur fetchRecentChanges :", err);
    return [];
  }
};


export const fetchWorkById = async (id,type) => { // tout simplement un call pour récup les infos d'un book ou work par son id
  const res = await axios.get(`https://openlibrary.org/${type}s/${id}.json`)
  return res.data;
};

// fetchworkById va me retourner un tableau d'author mais ça ne contient qu'un id d'auteur (key) que je fournis dans ce call api pour obtenir son nom
export const fetchAuthorsFromWorkObject = async (authors = []) => { 
  const names = await Promise.all(
    // promise.all plus performant qu'une boucle for car les calls se font en paralèle au lieu de faire un par un
    authors.map(async (a) => {
      const res = await axios.get(
        `https://openlibrary.org${a.author.key}.json`
      );
      return res.data.name;
    })
  );
  return names;
};

export const searchBooks = async ({ title, author, subject }) => { // recherche avancée
  const params = new URLSearchParams();
  if (title) params.append("title", title);
  if (author) params.append("author", author);
  if (subject) params.append("subject", subject);

  const res = await axios.get(`https://openlibrary.org/search.json?${params}`);
  return res.data.docs;
};

export const searchBooksByQuery = async (query, limit) => { // recherche rapide
  const res = await axios.get(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(
      query
    )}&limit=10`
  );
  return res.data.docs;
};
