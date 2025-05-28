import axios from "axios";

export const fetchWikipediaData = async (title) => {
  try {
    const res = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        format: "json",
        origin: "*",
        prop: "extracts|pageimages",
        exintro: true,
        explaintext: true,
        piprop: "thumbnail",
        pithumbsize: 400,
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
