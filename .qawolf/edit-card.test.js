const qawolf = require("qawolf");
const { createCards } = require("./utils");

let browser;
let context;

beforeAll(async () => {
  browser = await qawolf.launch();
  context = await browser.newContext();
  await qawolf.register(context);
});

afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
});

test("should edit a card movie", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:4200/", { waitUntil: "domcontentloaded" });

  const card = [
    {
      year: "1972",
      duration: "02:55",
      type: "Drama",
      streaming: "Netflix",
      title: "The Godfather",
    },
  ];

  await createCards(card, page, qawolf);

  await page.click('[data-testid="edit-card"]');
  await page.click('[data-testid="input-year"]');
  await page.fill('[data-testid="input-year"]', "1974");
  await page.click('[data-testid="field-title"] .mat-form-field-infix');
  await page.fill('[data-testid="input-title"]', "The Godfather: Part II");
  await page.click('[data-testid="save-button"]');
  await page.click('[data-testid="card-movie"] .body');

  await page.waitForSelector('[data-testid="card-movie"]');

  const cardTitle = await page.getByTestId("card-title").textContent();
  expect(cardTitle).toEqual("The Godfather: Part II");

  const cardYear = await page.getByTestId("card-year").textContent();
  expect(cardYear).toEqual("Ano de lançamento: 1974");
});
