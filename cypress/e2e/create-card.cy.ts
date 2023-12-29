import { createCards } from './utils';

describe('create card movie', () => {
  // cria o beforeEach para que o teste seja executado antes de cada it
  beforeEach(() => {
    cy.visit('/');
  });

  it('should create a card movie', () => {
    cy.get('[data-testid="card-movie"]').should('have.length', 0);

    createCards([
      {
        year: '1972',
        duration: '02:55',
        type: 'Drama',
        streaming: 'Netflix',
        title: 'The Godfather',
      },
    ]);

    cy.get('[data-testid="card-title"]').should('have.text', 'The Godfather');

    cy.get('[data-testid="card-movie"]').should('have.length', 1);
  });
});
