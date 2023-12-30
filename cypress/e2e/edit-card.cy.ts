import { createCards } from './utils';

describe('edit card movie', () => {
  // cria o beforeEach para que o teste seja executado antes de cada it
  beforeEach(() => {
    cy.visit('/');
  });

  it('should edit a card movie', () => {
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

    // clica no botão de editar
    cy.get('[data-testid="edit-card"]').click();

    // espera 1 segundo para que o modal seja aberto
    cy.wait(1000);
    
    // altera o ano
    cy.get('[data-testid="field-year"]').clear();
    cy.get('[data-testid="field-year"]').type('1974');

    // altera o título
    cy.get('[data-testid="field-title"]').clear();  
    cy.get('[data-testid="field-title"]').type('The Godfather: Part II');

    // clica no botão de salvar
    cy.get('[data-testid="save-button"]').click();

    // verifica se o título foi alterado
    cy.get('[data-testid="card-title"]').should('have.text', 'The Godfather: Part II');
    
  });
});