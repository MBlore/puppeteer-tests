const puppeteer = require('puppeteer');
const assert = require('chai').assert;

describe('HomePage', function() {
  let browser, page;

  // This is ran before every test. It's where you start a clean browser.
  beforeEach(async function() {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
  });

  // This is ran after every test; clean up after your browser.
  afterEach(() => browser.close());
  
  it('should have an auto background size on the body tag', async function() {
	  const response = await page.goto(`http://www.google.co.uk`);
	  
	  const bodyStyle = await page.evaluate(() => {
            const ele = document.querySelector('body');
            return getComputedStyle(ele).getPropertyValue('background-size');
		});
		
	  assert(bodyStyle, 'auto');
  });
  
  it ('should have a specific amount of divs', async function() {
	  const response = await page.goto(`http://www.google.co.uk`);
	  
	  const length = await page.evaluate(() => {
		  const handle = document.querySelectorAll('div');
		  return handle.length;
	  });
	  
	  assert(length, 184);
  });
  
  it('should return status code 200', async function() {
	  const response = await page.goto(`http://www.google.co.uk`);
	  assert.equal(response._headers.status, '200');
  });
});