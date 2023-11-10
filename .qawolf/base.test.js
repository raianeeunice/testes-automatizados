const qawolf = require("qawolf");

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

test("base", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:4200/", { waitUntil: "domcontentloaded" });
  await page.click('[placeholder="Buscar Filme..."]');
  await page.click(".mat-ripple");
  await page.click("#mat-input-0");
  await page.fill("#mat-input-0", "23:08");
  await page.click("#mat-input-1");
  await page.fill("#mat-input-1", "2023");
  await page.click(".mat-select-min-line");
  await page.click("text=Comedia");
  await page.click(".mat-form-field-hide-placeholder .mat-form-field-infix");
  await page.fill("#mat-input-2", "Netflix");
  await page.click("#mat-input-3");
  await page.fill("#mat-input-3", "Bla Bla");
  await page.click("text=Salvar");
  await qawolf.assertElementText(page, ".title", "Bla Bla");
});