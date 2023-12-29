import { createCards } from './utils';

describe('create card movie', () => {
  // cria o beforeEach para que o teste seja executado antes de cada it
  beforeEach(() => {
    cy.visit('/');
  });

  it('should create a card movie', () => {
    cy.get('[data-testid="card-movie"]').should('have.length', 0);

    // cria um array de 5 objetos para cards
    const cards = [
      {
        year: '1972',
        duration: '02:55',
        type: 'Drama',
        streaming: 'Netflix',
        title: 'The Godfather',
      },
      {
        year: '1994',
        duration: '02:22',
        type: 'Drama',
        streaming: 'Netflix',
        title: 'The Shawshank Redemption',
      },
      {
        year: '2008',
        duration: '02:32',
        type: 'Ação',
        streaming: 'Netflix',
        title: 'The Dark Knight',
      },
      {
        year: '2003',
        duration: '03:08',
        type: 'Aventura',
        streaming: 'Prime Video',
        title: 'The Lord of the Rings: The Return of the King',
      },
      {
        year: '1999',
        duration: '02:16',
        type: 'Ação',
        streaming: 'Prime Video',
        title: 'The Matrix',
      },
    ];

    createCards(cards);

    cy.get('[data-testid="card-movie"]').should('have.length', 5);
  });
});