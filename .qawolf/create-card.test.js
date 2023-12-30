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

test("should create a card", async () => {
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

  await page.waitForSelector("[data-testid='card-movie']");

  // verifica se o card foi criado com playwright
  const cardMovieCount = await page.getByTestId("card-movie").count();
  expect(cardMovieCount).toBe(1);

  // verifica se o card tem o título correto com playwright
  const cardTitle = await page.getByTestId("card-title").textContent();
  expect(cardTitle).toBe("The Godfather");
});
