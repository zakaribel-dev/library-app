import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BookCard from "../BookCard";

describe("BookCard", () => {
  const props = {
    title: "Test Book",
    author_name: ["Test Author"],
    coverId: 12345,
    workId: "OL12345W",
    first_publish_year: 2020,
    type: "works",
  };

  it("affiche le titre du livre", () => {
    render(
      <BrowserRouter>
        <BookCard {...props} />
      </BrowserRouter>
    );

    const title = screen.getByText("Test Book");
    expect(title).toBeInTheDocument();
  });

  it("affiche le nom de l'auteur", () => {
    render(
      <BrowserRouter>
        <BookCard {...props} />
      </BrowserRouter>
    );

    const author = screen.getByText("Test Author");
    expect(author).toBeInTheDocument();
  });

  it("affiche l'année de publication", () => {
    render(
      <BrowserRouter>
        <BookCard {...props} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Publié en 2020/)).toBeInTheDocument();
  });
});
