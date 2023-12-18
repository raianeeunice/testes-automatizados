import { Selector, fixture, test } from 'testcafe';

fixture('Getting Started').page('http://localhost:4200/');

const selectElement = Selector('*[data-testid="field-type"]');
const optionElement = Selector('*[data-testid="input-typeMovie"]');

test('My first test', async (t) => {
  // Test code goes here
  await t.click('*[data-testid="add-movie-button"]');
  await t.typeText('[data-testid="input-duration"]', '01:40');
  await t.selectText('[data-testid="input-year"]').pressKey('delete');
  await t.typeText('[data-testid="input-year"]', '2018');
  await t.click(selectElement);
  await t.click(optionElement.withText('Aventura'));
  await t.typeText('[data-testid="input-streaming"]', 'Netflix');
  await t.typeText('[data-testid="input-title"]', 'Filme teste 2018');
  await t.click('*[data-testid="save-button"]');

  // verifica se o titulo do card é o mesmo que foi inserido
  await t.expect(Selector('*[data-testid="card-title"]').innerText).eql('Filme teste 2018');
  // verifica se a lista de filmes está com 1 item
  await t.expect(Selector('*[data-testid="card-list"]').count).eql(1);
  // verifica se o ano do filme é 2018
  await t.expect(Selector('*[data-testid="card-year"]').innerText).eql('Ano de lançamento: 2018');
  // verifica se o tempo do filme é 01:40
  await t.expect(Selector('*[data-testid="card-duration"]').innerText).eql('Duração: 01:40h');
  // verifica se o streaming do filme é Netflix
  await t.expect(Selector('*[data-testid="card-streaming"]').innerText).eql('Plataforma: Netflix');
});
