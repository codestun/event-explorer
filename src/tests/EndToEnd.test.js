import puppeteer from 'puppeteer';

describe('filter events by city', () => {
  jest.setTimeout(10000);
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow down by 250ms,
      timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event-item');
  });

  afterAll(() => {
    browser.close();
  });

  test('show upcoming events from all cities when no city is searched', async () => {
    const events = await page.$$('#event-list .event-item');
    expect(events.length).toBeGreaterThan(0);
  });

  test('display city suggestions when typing in the city textbox', async () => {
    await page.type('#city-search .city', 'Ber');
    const citySuggestions = await page.$$('#city-search .suggestions li');
    expect(citySuggestions.length).toBeGreaterThan(0);
  });

  test('select a city from the suggested list and display events from that city', async () => {
    jest.setTimeout(10000);  // Set global timeout to 10 seconds
    await page.evaluate(() => document.querySelector('#city-search .city').value = '');
    await page.type('#city-search .city', 'Berlin');
    await page.waitForSelector('#city-search .suggestions li');

    // Click on the first suggestion that isn't "See all cities"
    const citySuggestions = await page.$$('#city-search .suggestions li');
    for (let i = 0; i < citySuggestions.length; i++) {
      const suggestionText = await (await citySuggestions[i].getProperty('textContent')).jsonValue();
      if (suggestionText !== 'See all cities') {
        await citySuggestions[i].click();
        break;
      }
    }

    const selectedCity = await page.$eval('#city-search .city', el => el.value);
    expect(selectedCity).toContain('Berlin');

    const events = await page.$$('#event-list .event-item');
    expect(events.length).toBeGreaterThan(0);
  });
});

describe('show/hide event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event-item');
  }, 30000);

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event-details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see details', async () => {
    await page.click('.event-details-btn');
    const eventDetails = await page.$('.event-details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide details', async () => {
    await page.click('.event-details-btn');
    const eventDetails = await page.$('.event-details');
    expect(eventDetails).toBeNull();
  });
});
