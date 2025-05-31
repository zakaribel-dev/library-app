import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "../Header";

describe("Header", () => {
  it("affiche les liens de navigation", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Recherche avancée")).toBeInTheDocument();
  });

  it("permet d'écrire dans le champ de recherche", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Quel livre ?");
    fireEvent.change(input, { target: { value: "Moby Dick" } });

    expect(input.value).toBe("Moby Dick");
  });
});
