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

test("base2", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:4200/", { waitUntil: "domcontentloaded" });
  await page.click('[data-testid="add-movie-button"]');
  await page.click('[data-testid="input-duration"]');
  await page.fill('[data-testid="input-duration"]', "02:30");
  await page.click('[data-testid="input-year"]');
  await page.fill('[data-testid="input-year"]', "1999");
  await page.click('[data-testid="field-type"] .mat-select-min-line');
  await qawolf.scroll(page, "#mat-select-0-panel", { x: 0, y: 80 });
  await page.click('css=[data-testid="input-typeMovie"] >> text=Romance');
  await page.click('[data-testid="input-streaming"]');
  await page.fill('[data-testid="input-streaming"]', "HBO");
  await page.click('[data-testid="field-title"] .mat-form-field-infix');
  await page.fill('[data-testid="input-title"]', "Um amor pra recordar");
  await page.click('[data-testid="save-button"]');
});