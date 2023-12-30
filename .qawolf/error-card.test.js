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

test("should error create a card movie", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:4200/", { waitUntil: "domcontentloaded" });

  const initialCardMovieCard = await page.getByTestId("card-movie").count();
  expect(initialCardMovieCard).toBe(0);

  const card = [
    {
      year: "1898",
      duration: "02:55",
      type: "Drama",
      streaming: "Netflix",
      title: " ",
    },
  ];

  await createCards(card, page, qawolf);

  // verifica se aparece a mensagem de erro
  const errorMessage = await page.getByTestId("error-min-title").textContent();
  expect(errorMessage).toContain("Campo com no mínimo 2 caracteres");
});
