async function createCards(cards, page, qawolf) {
  for (const card of cards) {
    await page.click('[data-testid="add-movie-button"]');
    await page.click('[data-testid="input-duration"]');
    await page.fill('[data-testid="input-duration"]', "");
    await page.fill('[data-testid="input-duration"]', card.duration);
    await page.click('[data-testid="input-year"]');
    await page.fill('[data-testid="input-year"]', card.year);
    await page.click('[data-testid="field-type"] .mat-form-field-infix');
    await page.click(
      `css=[data-testid="input-typeMovie"] >> text=` + card.type
    );
    await page.click('[data-testid="input-streaming"]');
    await page.fill('[data-testid="input-streaming"]', card.streaming);
    await page.click('[data-testid="field-title"] .mat-form-field-infix');
    await page.fill('[data-testid="input-title"]', card.title);
    await page.click('[data-testid="save-button"]');
  }
}

// TODO

// fazer listar varios cars, deletar varios cards, testar um com erro
// descobrir como rodar só no terminal
// anotar o que foi feito

module.exports = { createCards };
