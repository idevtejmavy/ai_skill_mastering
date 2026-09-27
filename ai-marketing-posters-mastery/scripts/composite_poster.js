/**
 * AI Marketing Posters Mastery - Composite Poster Script
 * Uses Playwright and HTML5/CSS3 to composite an AI background image,
 * a real brand logo, marketing headlines in French, price badge, and a WhatsApp CTA banner.
 */

const fs = require('fs');
const path = require('path');
// Check both local skill node_modules and global playwright
let chromium;
try {
  chromium = require('playwright').chromium;
} catch (e) {
  chromium = require('e:/Antigrativty/.agents/skills/playwright-skill/node_modules/playwright').chromium;
}

// Simple CLI argument parser
const args = process.argv.slice(2);
function getArg(key, defaultValue = '') {
  const idx = args.indexOf(`--${key}`);
  if (idx !== -1 && idx + 1 < args.length) return args[idx + 1];
  return defaultValue;
}

const bgPath = getArg('bg', '');
const logoPath = getArg('logo', '');
const brandName = getArg('brand', 'VENDEZ-VOUS eSHOP');
const brandSub = getArg('brand-sub', 'Produit 100% Authentique');
const headline = getArg('title', 'POUSSE RAPIDE & ANTI-CHUTE');
const subtitle = getArg('subtitle', 'BARBE & CHEVEUX');
const price = getArg('price', '8 500 FCFA');
const whatsapp = getArg('whatsapp', '+225 05 04 59 45 20');
const website = getArg('website', 'boutique-vendezvouse.com');
const reassurance1 = getArg('reassurance1', '🚚 Livraison 24h Abidjan');
const reassurance2 = getArg('reassurance2', '💵 Paiement à la livraison');
const outputPath = getArg('output', 'affiche_resultat.png');
const width = parseInt(getArg('width', '1080'), 10);
const height = parseInt(getArg('height', '1440'), 10);

if (!bgPath || !fs.existsSync(bgPath)) {
  console.error('Error: --bg path is required and must exist. Example: node composite_poster.js --bg ./image.jpg --logo ./logo.jpg');
  process.exit(1);
}

const bgBase64 = fs.readFileSync(bgPath).toString('base64');
const bgMime = bgPath.endsWith('.png') ? 'image/png' : 'image/jpeg';

let logoTag = '';
if (logoPath && fs.existsSync(logoPath)) {
  const logoBase64 = fs.readFileSync(logoPath).toString('base64');
  const logoMime = logoPath.endsWith('.png') ? 'image/png' : 'image/jpeg';
  logoTag = `<img class="logo-img" src="data:${logoMime};base64,${logoBase64}" alt="Logo" />`;
}

const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Poppins:wght@400;600;700;800&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      width: ${width}px;
      height: ${height}px;
      position: relative;
      overflow: hidden;
      font-family: 'Montserrat', sans-serif;
      background: #000;
    }

    .bg-image {
      position: absolute;
      top: 0;
      left: 0;
      width: ${width}px;
      height: ${height}px;
      object-fit: cover;
      z-index: 1;
    }

    /* Top Brand Badge */
    .top-header {
      position: absolute;
      top: 25px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 14px;
      background: rgba(8, 28, 20, 0.88);
      backdrop-filter: blur(12px);
      padding: 10px 28px 10px 16px;
      border-radius: 50px;
      border: 1.5px solid rgba(212, 175, 55, 0.6);
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }

    .logo-img {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #d4af37;
    }

    .brand-info {
      display: flex;
      flex-direction: column;
    }

    .brand-name {
      font-size: 19px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 1px;
    }

    .brand-sub {
      font-size: 12px;
      font-weight: 600;
      color: #d4af37;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    /* Bottom Contact Bar */
    .bottom-bar {
      position: absolute;
      bottom: 25px;
      left: 35px;
      right: 35px;
      z-index: 10;
      background: linear-gradient(135deg, rgba(5, 20, 14, 0.95), rgba(10, 36, 26, 0.92));
      backdrop-filter: blur(16px);
      border-radius: 28px;
      padding: 18px 28px;
      border: 2px solid rgba(212, 175, 55, 0.7);
      box-shadow: 0 15px 40px rgba(0,0,0,0.6);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .left-col {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .reassurance-pills {
      display: flex;
      gap: 15px;
      align-items: center;
    }

    .pill {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 15px;
      font-weight: 700;
      color: #ffffff;
    }

    .website-link {
      font-size: 13px;
      font-weight: 500;
      color: #a8d5ba;
      letter-spacing: 0.5px;
    }

    /* WhatsApp Button CTA */
    .whatsapp-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, #25D366, #128C7E);
      color: white;
      padding: 14px 24px;
      border-radius: 50px;
      text-decoration: none;
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45);
      border: 1px solid rgba(255,255,255,0.3);
    }

    .wa-icon {
      width: 30px;
      height: 30px;
      fill: white;
    }

    .wa-text {
      display: flex;
      flex-direction: column;
    }

    .wa-label {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.5px;
      opacity: 0.95;
    }

    .wa-number {
      font-size: 17px;
      font-weight: 900;
      letter-spacing: 0.8px;
    }
  </style>
</head>
<body>
  <img class="bg-image" src="data:${bgMime};base64,${bgBase64}" />

  <!-- Top Header with Brand Logo -->
  <div class="top-header">
    ${logoTag}
    <div class="brand-info">
      <span class="brand-name">${brandName}</span>
      <span class="brand-sub">${brandSub}</span>
    </div>
  </div>

  <!-- Bottom Conversion Bar -->
  <div class="bottom-bar">
    <div class="left-col">
      <div class="reassurance-pills">
        <div class="pill">${reassurance1}</div>
        <div class="pill">${reassurance2}</div>
      </div>
      ${website ? `<div class="website-link">🌐 ${website}</div>` : ''}
    </div>

    <!-- Official WhatsApp Pill Button -->
    <div class="whatsapp-btn">
      <svg class="wa-icon" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
      <div class="wa-text">
        <span class="wa-label">WhatsApp Direct</span>
        <span class="wa-number">${whatsapp}</span>
      </div>
    </div>
  </div>
</body>
</html>
`;

(async () => {
  console.log(`Generating poster ${width}x${height} -> ${outputPath}...`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1
  });

  await page.setContent(html);
  await page.waitForTimeout(500);

  const resolvedOutput = path.resolve(outputPath);
  const outDir = path.dirname(resolvedOutput);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  await page.screenshot({ path: resolvedOutput });
  await browser.close();
  console.log('Done! Poster successfully saved to:', resolvedOutput);
})();
