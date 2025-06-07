import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";

describe("Header", () => {
  it("affiche les liens de navigation", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("Accueil")).toBeInTheDocument(); // verifs que les links que Header nous provide sont bien render dans le DOM
    expect(screen.getByText("Recherche avancée")).toBeInTheDocument();
  });

  it("permet d'écrire dans le champ de recherche", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Quel livre ?"); // test de l'input..
    fireEvent.change(input, { target: { value: "Harry Potter" } });

    expect(input.value).toBe("Harry Potter"); // val bien maj ?
  });
});
