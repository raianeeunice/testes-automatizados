import { MovieCard } from '../src/app/core/interfaces/movies-list.interface';
import { Selector, fixture, test } from 'testcafe';

export async function createCards(t: TestController, cards: MovieCard[]) {
  const selectElement = Selector('*[data-testid="field-type"]');
  const optionElement = Selector('*[data-testid="input-typeMovie"]');

  for (const card of cards) {
    await t.click('*[data-testid="add-movie-button"]');
    await t.typeText('[data-testid="input-duration"]', card.duration);
    await t.selectText('[data-testid="input-year"]').pressKey('delete');
    await t.typeText('[data-testid="input-year"]', card.year);
    await t.click(selectElement);
    await t.click(optionElement.withText(card.type));
    await t.typeText('[data-testid="input-streaming"]', card.streaming);
    await t.typeText('[data-testid="input-title"]', card.title);
    await t.click('*[data-testid="save-button"]');
  }
}
