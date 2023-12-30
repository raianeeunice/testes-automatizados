import { Selector, fixture, test } from 'testcafe';
import { createCards } from './utils';

fixture('error-card').page('http://localhost:4200/');



test('should error create a card movie', async (t) => {

  await t.expect(Selector('*[data-testid="card-movie"]').count).eql(0);

  // Test code goes here
  await createCards(t, [
    {
      year: '1898',
      duration: '02:55',
      type: 'Drama',
      streaming: 'Netflix',
      title: ' ',
    },
  ]);

  // verifica se aparece a mensagem de erro
  await t
    .expect(Selector('*[data-testid="error-min-title"]').withText('Campo com no mínimo 2 caracteres').exists)
    .eql(true)
});
