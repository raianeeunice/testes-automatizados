import { Selector, fixture, test } from 'testcafe';
import { createCards } from './utils';

fixture('delete-all').page('http://localhost:4200/');



test('should delete all the cards', async (t) => {

  await t.expect(Selector('*[data-testid="card-movie"]').count).eql(0);

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

  await createCards(t, cards)

  // verifica se todos estão sendo exibidos
  await t.expect(Selector('*[data-testid="card-movie"]').count).eql(5);

  // deleta todos
  await t.click('*[data-testid="delete-all"]');

  // verifica se todos foram deletados
  await t.expect(Selector('*[data-testid="card-movie"]').count).eql(0);

});
