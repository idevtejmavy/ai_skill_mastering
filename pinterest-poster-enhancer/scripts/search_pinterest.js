/**
 * Pinterest Poster Enhancer - Pinterest Scraper & Visual Explorer
 * Automates Pinterest searches for poster inspiration, clears login modals,
 * and saves clean visual moodboards for trend analysis.
 */

const { chromium } = require('E:/Antigrativty/.agents/skills/playwright-skill/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
function getArg(key, defaultValue = '') {
  const idx = args.indexOf(`--${key}`);
  if (idx !== -1 && idx + 1 < args.length) return args[idx + 1];
  return defaultValue;
}

const query = getArg('query', 'product advertising poster design');
const outputDir = getArg('output-dir', 'C:/Users/tchim/.gemini/antigravity/brain/ea9f2b0b-340a-4f03-a5bb-b9e80aa70482');
const prefix = getArg('prefix', 'pinterest_trend');

async function run() {
  console.log(`[Pinterest Explorer] Searching for: "${query}"...`);
  const encodedQuery = encodeURIComponent(query);
  const searchUrl = `https://www.pinterest.com/search/pins/?q=${encodedQuery}&rs=typed`;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  try {
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 35000 });
  } catch (e) {
    console.log('[Pinterest Explorer] Navigation timeout reached, extracting loaded content...');
  }

  await page.waitForTimeout(3000);

  // Clean login dialogs and obstructive overlays
  await page.evaluate(() => {
    const dialogs = document.querySelectorAll('[role="dialog"], [data-test-id="login-modal-default"], div[style*="fixed"]');
    dialogs.forEach(d => d.remove());
    const overlays = document.querySelectorAll('div[class*="backdrop"], div[class*="overlay"], div[style*="z-index: 99"]');
    overlays.forEach(o => o.remove());
    document.body.style.overflow = 'auto';
  });

  await page.waitForTimeout(1000);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Capture Page 1
  const shot1 = path.join(outputDir, `${prefix}_page1.png`);
  await page.screenshot({ path: shot1, fullPage: false });
  console.log(`[Pinterest Explorer] Moodboard 1 saved: ${shot1}`);

  // Scroll down for more variations
  await page.evaluate(() => window.scrollBy(0, 1100));
  await page.waitForTimeout(2000);

  // Clean overlays again after scroll
  await page.evaluate(() => {
    const dialogs = document.querySelectorAll('[role="dialog"], [data-test-id="login-modal-default"]');
    dialogs.forEach(d => d.remove());
  });

  const shot2 = path.join(outputDir, `${prefix}_page2.png`);
  await page.screenshot({ path: shot2, fullPage: false });
  console.log(`[Pinterest Explorer] Moodboard 2 saved: ${shot2}`);

  await browser.close();
  console.log('[Pinterest Explorer] Exploration successfully completed!');
}

run().catch(err => {
  console.error('[Pinterest Explorer] Error:', err.message);
  process.exit(1);
});
