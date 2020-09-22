const puppeteer = require('puppeteer');

test('should add two numbers ', () => {
  const sum = 2 + 3;

  expect(sum).toEqual(5);
  // should() -- chai
  // assert() -- mocha
  // all are same as expect of jest
});

test('We can launch a browser', async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  const text = await page.$eval('a.brand-logo', el => el.innerHTML);
  expect(text).toBe('Blogster');
});
