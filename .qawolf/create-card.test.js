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

test("create-card", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:4200/", { waitUntil: "domcontentloaded" });
  await page.click('[data-testid="add-movie-button"]');
  await page.click('[data-testid="input-duration"]');
  await page.fill('[data-testid="input-duration"]', "02:35");
  await page.click('[data-testid="input-year"]');
  await page.fill('[data-testid="input-year"]', "2001");
  await page.click('[data-testid="field-type"] .mat-form-field-infix');
  await qawolf.scroll(page, "#mat-select-0-panel", { x: 0, y: 76 });
  await page.click('css=[data-testid="input-typeMovie"] >> text=Fantasia');
  await page.click('[data-testid="input-streaming"]');
  await page.fill('[data-testid="input-streaming"]', "HBO");
  await page.click('[data-testid="field-title"] .mat-form-field-infix');
  await page.fill('[data-testid="input-title"]', "Harry Potter");
  await page.click('[data-testid="save-button"]');
  await page.click("body");
});