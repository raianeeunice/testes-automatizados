import { Selector, fixture, test } from 'testcafe';
import { createCards } from './utils';

fixture('delete-card').page('http://localhost:4200/');



test('should delete a card movie', async (t) => {

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

  // clica no botão de deletar
  await t.click('[data-testid="delete-card"]');

  // verifica se o card foi deletado
  await t.expect(Selector('*[data-testid="card-movie"]').count).eql(0);

  // verifica se não existe mais o título
  await t
    .expect(Selector('*[data-testid="card-title"]').exists)
    .eql(false)
});
