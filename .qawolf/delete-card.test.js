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

test("delete-card", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:4200/", { waitUntil: "domcontentloaded" });

  const initialCardMovieCard = await page.getByTestId("card-movie").count();
  expect(initialCardMovieCard).toBe(0);

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

  const cardTitle = await page.getByTestId("card-title").textContent();
  expect(cardTitle).toBe("The Godfather");

  await page.click('[data-testid="delete-card"]');

  // verifica se a lista de cards está vazia
  const elem = await page.getByTestId("card-list").count();
  expect(elem).toBe(0);

  const elemTitle = await page.getByTestId("card-title").count();
  expect(elemTitle).toBe(0);
});
