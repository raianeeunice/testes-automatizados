const qawolf = require("qawolf");
const { createCards } = require("./utils");

beforeAll(async () => {
  browser = await qawolf.launch();
  context = await browser.newContext();
  await qawolf.register(context);
});

afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
});

test("should delete all cards", async () => {
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
    {
      year: "1994",
      duration: "02:22",
      type: "Drama",
      streaming: "Netflix",
      title: "The Shawshank Redemption",
    },
    {
      year: "2008",
      duration: "02:32",
      type: "Ação",
      streaming: "Netflix",
      title: "The Dark Knight",
    },
    {
      year: "2003",
      duration: "03:08",
      type: "Aventura",
      streaming: "Prime Video",
      title: "The Lord of the Rings: The Return of the King",
    },
    {
      year: "1999",
      duration: "02:16",
      type: "Ação",
      streaming: "Prime Video",
      title: "The Matrix",
    },
  ];

  await createCards(card, page, qawolf);
  await page.waitForTimeout(100);

  const cardMovieCount = await page.getByTestId("card-movie").count();
  expect(cardMovieCount).toBe(5);

  await page.click('[data-testid="delete-all"]');

  const cardMovieCount2 = await page.getByTestId("card-movie").count();
  expect(cardMovieCount2).toBe(0);
});
