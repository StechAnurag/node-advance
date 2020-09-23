const puppeteer = require('puppeteer');

let browser, page;
beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  // const context = await browser.createIncognitoBrowserContext();
  // page = await context.newPage();
  page = await browser.newPage();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  // await browser.close();
});

/*
  test('should add two numbers ', () => {
    const sum = 2 + 3;

    expect(sum).toEqual(5);
    // should() -- chai
    // assert() -- mocha
    // all are same as expect() of jest
  });
*/

test('the header show up brand logo', async () => {
  const text = await page.$eval('a.brand-logo', el => el.innerHTML);
  expect(text).toBe('Blogster');
});

test('clicking login starts OAuth flow', async () => {
  await page.click('.right a');
  const url = page.url();
  expect(url).toMatch(new RegExp('accounts.google.com'));
});

test.only('when signed in, shows a logout button', async () => {
  const testUserId = '5f64a79b9c6b4d2e9844f919';

  const Buffer = require('safe-buffer').Buffer;
  const sessionObj = {
    passport: {
      user: testUserId
    }
  };
  const sessionString = Buffer.from(JSON.stringify(sessionObj)).toString('base64');
  const keys = require('../config/keys');
  const Keygrip = require('keygrip');
  const keygrip = new Keygrip([keys.cookieKey]);
  const sig = keygrip.sign('session=' + sessionString);

  await page.setCookie({ name: 'session', value: sessionString });
  await page.setCookie({ name: 'session.sig', value: sig });
  await page.goto('http://localhost:3000');
});
