import axios from "axios";

export const fetchWikipediaData = async (title) => {
  try {
    const res = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query", // on precise qu'on veut faire une query (y a moyen de faire d'autres action au niveau de l'api comme edit par exempl)
        format: "json",
        origin: "*",// cors
        prop: "extracts|pageimages", //extracts comme son nom l'indique : on veut juste recup des extraits textuel + les images (pageimages) du wiki
        // https://www.mediawiki.org/wiki/Extension:PageImages   séparation des props avec "|"
        exintro: true, //  // je souhaite des extracts du premier paragraphe (intro)
        explaintext: true,  //// return du texte pur pas du html
        titles: title, 
      },
    });

    const pages = res.data.query.pages;
    const page = Object.values(pages)[0];
    if (!page || page.missing) return null;

    return {
      extract: page.extract,
      image: page.thumbnail?.source,
      link: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
    };
  } catch (error) {
    console.error("Wikipedia fetch error:", error);
    return null;
  }
};
