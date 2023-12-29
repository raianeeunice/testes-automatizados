import { MovieCard } from '../../src/app/core/interfaces/movies-list.interface';

export const createCards = (cards: MovieCard[]) => {
  cards.forEach((card) => {
    cy.get('[data-testid="add-movie-button"]').click();
    // espera 1 segundo para que o modal seja aberto
    cy.wait(1000);

    cy.get('[data-testid="field-duration"]').type(card.duration);
    cy.get('[data-testid="field-year"]').clear();
    cy.get('[data-testid="field-year"]').type(card.year);
    cy.get('[data-testid="field-type"]')
      .click()
      .get('[data-testid="input-typeMovie"]')
      .contains(card.type)
      .click();
    cy.get('[data-testid="field-streaming"]').type(card.streaming);
    cy.get('[data-testid="field-title"]').type(card.title);

    cy.get('[data-testid="save-button"]').click();
  });
};
