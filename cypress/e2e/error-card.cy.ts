import { createCards } from './utils';

describe('error card movie', () => {
  // cria o beforeEach para que o teste seja executado antes de cada it
  beforeEach(() => {
    cy.visit('/');
  });

  it('should error create a card movie', () => {
    cy.get('[data-testid="card-movie"]').should('have.length', 0);

    createCards([
      {
        year: '1898',
        duration: '02:55',
        type: 'Drama',
        streaming: 'Netflix',
        title: ' ',
      },
    ]);

    // verifica se aparece a mensagem de erro
    cy.get('[data-testid="error-min-title"]').contains(
      'Campo com no mínimo 2 caracteres'
    ).should('be.visible');
  });
});
