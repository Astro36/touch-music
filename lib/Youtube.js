const jsdom = require('jsdom');
const puppeteer = require('puppeteer');

const { JSDOM } = jsdom;

class Youtube {
  static find(str) {
    return new Promise(async (resolve) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`https://www.youtube.com/results?search_query=${encodeURIComponent(str)}`);
      const html = await page.content();
      const url = `http://www.youtube.com${(new JSDOM(html)).window.document.querySelector('#contents > ytd-video-renderer > #dismissable > .text-wrapper > #meta > #title-wrapper > .title-and-badge > #video-title').href}`;
      resolve(url);
      await page.close();
      await browser.close();
    });
  }
}

module.exports = Youtube;
