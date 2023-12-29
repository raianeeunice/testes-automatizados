import { createCards } from './utils';

describe('delete card movie', () => {
  // cria o beforeEach para que o teste seja executado antes de cada it
  beforeEach(() => {
    cy.visit('/');
  });

  it('should delete a card movie', () => {
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
   
    // clica no botão de deletar
    cy.get('[data-testid="delete-card"]').click();

    // verifica se o card foi deletado
    cy.get('[data-testid="card-movie"]').should('have.length', 0);

    // verifica se não existe mais o título
    cy.get('[data-testid="card-title"]').should('not.exist', 'The Godfather');    
  });
});