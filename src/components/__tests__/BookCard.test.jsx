import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookCard from "../BookCard";

describe("BookCard", () => {
  const props = {    
    author_name: ["Test Author"],
    coverId: 12345,
    workId: "OL12345W",
    first_publish_year: 2020,
    type: "works",
  };

  it("affiche le titre du livre", () => {
    render(
      <MemoryRouter>
        <BookCard {...props} />
      </MemoryRouter>
    );

    const title = screen.getByText("Test Book");
    expect(title).toBeInTheDocument();
  });

  it("affiche le nom de l'auteur", () => {  
    render(
      <MemoryRouter>
        <BookCard {...props} />
      </MemoryRouter>
    );

    const author = screen.getByText("Test Author");
    expect(author).toBeInTheDocument();
  });

  it("affiche l'année de publication", () => { 
    render(
      <MemoryRouter>
        <BookCard {...props} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Publié en 2020/)).toBeInTheDocument();
  });
});
