import { Selector, fixture, test } from 'testcafe';
import { createCards } from './utils';

fixture('edit-card').page('http://localhost:4200/');

test('should edit a card movie', async (t) => {
  await t.expect(Selector('*[data-testid="card-movie"]').count).eql(0);

  // Test code goes here
  await createCards(t, [
    {
      year: '1972',
      duration: '02:55',
      type: 'Drama',
      streaming: 'Netflix',
      title: 'The Godfather',
    },
  ]);

  // verifica o titulo do card
  await t
    .expect(Selector('*[data-testid="card-title"]').innerText)
    .eql('The Godfather');

  // clica no botão de editar
  await t.click('[data-testid="edit-card"]');

  // altera o ano
  await t.selectText('[data-testid="input-year"]').pressKey('delete');
  await t.typeText('[data-testid="input-year"]', '1974');

  // altera o titulo
  await t.selectText('[data-testid="input-title"]').pressKey('delete');
  await t.typeText('[data-testid="input-title"]', 'The Godfather: Part II');

  // clica no botao de salvar
  await t.click('[data-testid="save-button"]');

  await t
    .expect(Selector('*[data-testid="card-title"]').innerText)
    .eql('The Godfather: Part II');

  await t
    .expect(Selector('*[data-testid="card-year"]').innerText)
    .eql('Ano de lançamento: 1974');
});
