import { Selector, fixture, test } from 'testcafe';
import { createCards } from './utils';

fixture('create-card').page('http://localhost:4200/');

test('should create a card movie', async (t) => {
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
  // verifica a lista de filmes
  await t.expect(Selector('*[data-testid="card-movie"]').count).eql(1);
});
