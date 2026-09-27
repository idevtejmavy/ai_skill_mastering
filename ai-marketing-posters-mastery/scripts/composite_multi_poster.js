/**
 * AI Marketing Posters Mastery - Multi-Product Composite Poster Script
 * Automatically renders high-converting multi-product e-commerce posters (2 to 4 products)
 * using Playwright, real product photos (with or without rembg cutout), VVS brand logo,
 * specs bullets, FCFA prices, and WhatsApp conversion bar.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let chromium;
try {
  chromium = require('playwright').chromium;
} catch (e) {
  chromium = require('e:/Antigrativty/.agents/skills/playwright-skill/node_modules/playwright').chromium;
}

const args = process.argv.slice(2);
function getArg(key, defaultValue = '') {
  const idx = args.indexOf(`--${key}`);
  if (idx !== -1 && idx + 1 < args.length) return args[idx + 1];
  return defaultValue;
}

const configPath = getArg('config', '');
const bgPath = getArg('bg', '');
const logoPath = getArg('logo', 'E:/Documents/PRJ_VENDEZVOUSESHOP/LOGO/vesion_carree v2.jpg');
const brandName = getArg('brand', 'VENDEZ-VOUS eSHOP');
const title = getArg('title', '3 LAPTOPS PRO & MULTIMÉDIA');
const subtitle = getArg('subtitle', 'Performances Supérieures, Robustesse & Garantie • Prêts pour le Travail & les Études');
const flashBadge = getArg('flash', '🔥 ARRIVAGE EXCLUSIF • ÉDITION LIMITÉE 🔥');
const whatsapp = getArg('whatsapp', '+225 05 04 59 45 20');
const r1 = getArg('r1', '🚚 Livraison 24h|Abidjan & Partout en CI');
const r2 = getArg('r2', '💵 Paiement à la Livraison|Vérifiez avant de payer');
const r3 = getArg('r3', '🛡️ Garantie & Test|Matériel 100% Certifié');
const outputPath = getArg('output', 'affiche_multi_produits.png');
const width = parseInt(getArg('width', '1080'), 10);
const height = parseInt(getArg('height', '1440'), 10);
const autoRembg = args.includes('--auto-rembg');

let products = [];
if (configPath && fs.existsSync(configPath)) {
  const raw = fs.readFileSync(configPath, 'utf8');
  products = JSON.parse(raw);
} else {
  const productsJson = getArg('products', '');
  if (productsJson) {
    try {
      products = JSON.parse(productsJson);
    } catch (e) {
      console.error('Invalid --products JSON:', e.message);
    }
  }
}

// Fallback sample products if none provided
if (!products || products.length === 0) {
  products = [
    {
      name: 'Lenovo ThinkPad E540',
      tag: 'Économique & Robuste',
      price: '140 000 FCFA',
      specs: ['Processeur Intel Core i5', 'Mémoire RAM : 8 Go', 'Disque : 500 Go Stockage', 'Écran 15.6" Confort + Pavé Num.'],
      image: ''
    },
    {
      name: 'Apple MacBook Pro 13"',
      tag: '⭐ Coup de Cœur Premium',
      featured: true,
      price: '350 000 FCFA',
      specs: ['Intel Core i5 Quad-Core', 'Mémoire RAM : 8 Go High-Speed', '256 Go SSD Ultra-Rapide', 'Écran Retina & Touch Bar'],
      image: ''
    },
    {
      name: 'Lenovo K21 Slim',
      tag: 'Ultra-Portable & Slim',
      price: '155 000 FCFA',
      specs: ['Processeur Intel Core i5', 'Mémoire RAM : 8 Go', 'Disque : 500 Go Stockage', 'Format 12.5" Léger & Compact'],
      image: ''
    }
  ];
}

// Handle Auto Rembg if requested
if (autoRembg) {
  products.forEach((p, idx) => {
    if (p.image && fs.existsSync(p.image) && !p.image.includes('_nobg')) {
      const outNobg = p.image.replace(/\.[^.]+$/, '_nobg.png');
      if (!fs.existsSync(outNobg)) {
        try {
          console.log(`Running rembg on ${p.image}...`);
          execSync(`python -c "from rembg import remove, new_session; from PIL import Image; s=new_session('u2net'); img=Image.open(r'${p.image}'); remove(img, session=s).save(r'${outNobg}')"`);
          p.image = outNobg;
        } catch (err) {
          console.warn('Rembg execution fallback:', err.message);
        }
      } else {
        p.image = outNobg;
      }
    }
  });
}

// Prepare Base64 assets
const logoBase64 = fs.existsSync(logoPath) ? `data:image/jpeg;base64,${fs.readFileSync(logoPath).toString('base64')}` : '';
const bgBase64 = (bgPath && fs.existsSync(bgPath)) ? `data:image/jpeg;base64,${fs.readFileSync(bgPath).toString('base64')}` : '';

// Helper to encode image
function getImageSrc(imgPath) {
  if (imgPath && fs.existsSync(imgPath)) {
    const ext = path.extname(imgPath).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
    return `data:${mime};base64,${fs.readFileSync(imgPath).toString('base64')}`;
  }
  return '';
}

// Parse reassurances
function parseReassurance(str, defaultIcon = '✔') {
  const parts = str.split('|');
  const main = parts[0] || '';
  const sub = parts[1] || '';
  return { main, sub };
}
const r1Parsed = parseReassurance(r1);
const r2Parsed = parseReassurance(r2);
const r3Parsed = parseReassurance(r3);

const cardsHtml = products.map((prod) => {
  const isFeatured = prod.featured ? 'featured' : '';
  const tagClass = prod.featured ? 'tag-featured' : 'tag-standard';
  const tagText = prod.tag || (prod.featured ? '⭐ Coup de Cœur' : 'En Vedette');
  const imgSrc = getImageSrc(prod.image);
  const imgTag = imgSrc ? `<img src="${imgSrc}" alt="${prod.name}" />` : `<div style="font-size:40px;color:#555;">💻</div>`;
  const specsList = (prod.specs || []).map(s => `<li class="spec-item"><span class="dot">✔</span> ${s}</li>`).join('');

  return `
    <div class="product-card ${isFeatured}">
      <div class="card-tag ${tagClass}">${tagText}</div>
      <div class="img-box">
        ${imgTag}
        <div class="pedestal-glow"></div>
      </div>
      <div class="card-header-info">
        <h2 class="model-title">${prod.name}</h2>
      </div>
      <ul class="specs-list">
        ${specsList}
      </ul>
      <div class="price-box">
        <div class="price-label">${prod.priceLabel || (prod.featured ? 'Offre Exceptionnelle' : 'Prix Promotionnel')}</div>
        <div class="price-value">${prod.price}</div>
      </div>
    </div>
  `;
}).join('');

const gridCols = products.length === 2 ? '1fr 1fr' : (products.length === 4 ? '1fr 1fr 1fr 1fr' : '1fr 1.08fr 1fr');

const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Affiche Multi-Produits VVS</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;0,800;0,900;1,800&family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: ${width}px;
      height: ${height}px;
      background: #080b12;
      font-family: 'Montserrat', sans-serif;
      color: #fff;
      position: relative;
      overflow: hidden;
    }
    .bg-layer {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      ${bgBase64 ? `background-image: url('${bgBase64}');` : ''}
      background-size: cover;
      background-position: center bottom;
      opacity: 0.35;
      filter: blur(2px);
      z-index: 0;
    }
    .bg-gradient {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: radial-gradient(circle at 50% 25%, rgba(0, 180, 216, 0.16) 0%, rgba(10, 13, 20, 0.88) 60%, #080a0f 100%);
      z-index: 1;
    }
    .content {
      position: relative;
      z-index: 2;
      width: 100%; height: 100%;
      display: flex; flex-direction: column; justify-content: space-between;
      padding: 38px 36px 36px 36px;
    }
    .header {
      text-align: center; display: flex; flex-direction: column; align-items: center;
    }
    .brand-row {
      display: flex; align-items: center; gap: 14px;
      background: rgba(255, 255, 255, 0.06);
      padding: 8px 24px; border-radius: 50px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
      margin-bottom: 12px;
    }
    .brand-logo {
      width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid #FFB703;
    }
    .brand-name {
      font-size: 19px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
      background: linear-gradient(90deg, #FFFFFF, #E2E8F0);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .brand-badge {
      background: #FFB703; color: #000; font-size: 11px; font-weight: 900;
      padding: 3px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px;
    }
    .flash-badge {
      display: inline-block;
      background: linear-gradient(135deg, #FF3366, #FF6B35);
      color: #fff; font-size: 12px; font-weight: 900;
      padding: 5px 18px; border-radius: 30px; letter-spacing: 2.5px; text-transform: uppercase;
      box-shadow: 0 4px 15px rgba(255, 51, 102, 0.4);
      margin-bottom: 10px;
    }
    .main-title {
      font-size: 40px; font-weight: 900; line-height: 1.15; text-transform: uppercase; letter-spacing: 0.5px;
      background: linear-gradient(180deg, #FFFFFF 30%, #A0AEC0 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      text-shadow: 0 4px 25px rgba(0, 0, 0, 0.8);
      margin-bottom: 6px;
    }
    .sub-title {
      font-size: 15px; color: #CBD5E1; font-weight: 600; letter-spacing: 0.8px;
      text-shadow: 0 2px 8px rgba(0,0,0,0.8);
    }
    .cards-container {
      display: grid;
      grid-template-columns: ${gridCols};
      gap: 16px;
      align-items: stretch;
      margin: 14px 0;
    }
    .product-card {
      background: rgba(18, 24, 38, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      padding: 16px 14px 18px 14px;
      display: flex; flex-direction: column; justify-content: space-between;
      backdrop-filter: blur(15px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      position: relative;
    }
    .product-card.featured {
      background: rgba(22, 30, 48, 0.85);
      border: 2px solid #00F0FF;
      box-shadow: 0 12px 40px rgba(0, 240, 255, 0.25), 0 0 20px rgba(0, 240, 255, 0.15) inset;
      transform: scale(1.02);
      z-index: 3;
    }
    .card-tag {
      align-self: center; font-size: 11px; font-weight: 800; padding: 4px 12px;
      border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;
    }
    .tag-standard {
      background: rgba(255, 255, 255, 0.1); color: #E2E8F0; border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .tag-featured {
      background: linear-gradient(90deg, #FFB703, #FF8E00);
      color: #000; font-weight: 900; box-shadow: 0 2px 10px rgba(255, 183, 3, 0.4);
    }
    .img-box {
      width: 100%; height: 200px; display: flex; align-items: center; justify-content: center;
      position: relative; margin-bottom: 12px; perspective: 800px;
    }
    .product-card.featured .img-box { height: 220px; }
    .img-box img {
      max-width: 95%; max-height: 95%; object-fit: contain;
      filter: drop-shadow(0 15px 18px rgba(0, 0, 0, 0.7));
    }
    .pedestal-glow {
      position: absolute; bottom: 5px; width: 80%; height: 18px; border-radius: 50%;
      background: radial-gradient(ellipse, rgba(0, 240, 255, 0.35) 0%, transparent 70%);
      z-index: -1;
    }
    .product-card.featured .pedestal-glow {
      background: radial-gradient(ellipse, rgba(255, 183, 3, 0.45) 0%, rgba(0, 240, 255, 0.25) 50%, transparent 75%);
      height: 24px;
    }
    .card-header-info { text-align: center; margin-bottom: 10px; }
    .model-title {
      font-size: 19px; font-weight: 900; color: #FFFFFF; line-height: 1.2; margin-bottom: 4px;
    }
    .product-card.featured .model-title { font-size: 21px; color: #00F0FF; }
    .specs-list {
      list-style: none; display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px;
      background: rgba(0, 0, 0, 0.25); padding: 10px 12px; border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .spec-item {
      font-size: 12px; color: #E2E8F0; display: flex; align-items: center; gap: 7px; font-weight: 600;
    }
    .spec-item .dot { color: #00F0FF; font-size: 14px; }
    .product-card.featured .spec-item .dot { color: #FFB703; }
    .price-box {
      text-align: center;
      background: linear-gradient(135deg, rgba(255, 183, 3, 0.15), rgba(255, 142, 0, 0.05));
      border: 1.5px solid #FFB703; padding: 10px 8px; border-radius: 14px;
      box-shadow: 0 4px 15px rgba(255, 183, 3, 0.2);
    }
    .product-card.featured .price-box {
      background: linear-gradient(135deg, #FFB703, #FF8E00); border: none;
      box-shadow: 0 6px 20px rgba(255, 183, 3, 0.45);
    }
    .price-label {
      font-size: 10px; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; color: #FFD166; margin-bottom: 2px;
    }
    .product-card.featured .price-label { color: #1A1A1A; }
    .price-value {
      font-size: 24px; font-weight: 900; letter-spacing: 0.5px; color: #FFFFFF; font-family: 'Poppins', sans-serif;
    }
    .product-card.featured .price-value { color: #0B0E14; font-size: 26px; }
    .footer-section { display: flex; flex-direction: column; gap: 14px; }
    .trust-badges-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
    .trust-pill {
      background: rgba(255, 255, 255, 0.07); border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px; padding: 8px 12px; display: flex; align-items: center; gap: 10px; backdrop-filter: blur(8px);
    }
    .trust-icon { font-size: 22px; line-height: 1; }
    .trust-text { display: flex; flex-direction: column; }
    .trust-text-main { font-size: 12px; font-weight: 800; color: #FFFFFF; }
    .trust-text-sub { font-size: 10px; color: #94A3B8; font-weight: 600; }
    .cta-banner {
      background: linear-gradient(90deg, #25D366, #128C7E);
      border-radius: 20px; padding: 16px 28px; display: flex; align-items: center; justify-content: space-between;
      box-shadow: 0 10px 30px rgba(37, 211, 102, 0.35); border: 2px solid rgba(255, 255, 255, 0.3);
    }
    .cta-left { display: flex; align-items: center; gap: 18px; }
    .whatsapp-circle {
      width: 52px; height: 52px; background: #FFFFFF; border-radius: 50%;
      display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
    }
    .whatsapp-circle svg { width: 32px; height: 32px; fill: #25D366; }
    .cta-info { display: flex; flex-direction: column; }
    .cta-top { font-size: 13px; font-weight: 800; color: #E8F8EE; text-transform: uppercase; letter-spacing: 1.5px; }
    .cta-phone { font-size: 28px; font-weight: 900; color: #FFFFFF; letter-spacing: 1.5px; font-family: 'Poppins', sans-serif; }
    .cta-btn {
      background: #FFFFFF; color: #075E54; font-size: 14px; font-weight: 900;
      padding: 12px 26px; border-radius: 30px; text-transform: uppercase; letter-spacing: 1px;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25); display: flex; align-items: center; gap: 8px;
    }
  </style>
</head>
<body>
  <div class="bg-layer"></div>
  <div class="bg-gradient"></div>

  <div class="content">
    <div class="header">
      <div class="brand-row">
        ${logoBase64 ? `<img class="brand-logo" src="${logoBase64}" alt="Logo" />` : ''}
        <span class="brand-name">${brandName}</span>
        <span class="brand-badge">Boutique Officielle</span>
      </div>
      <div class="flash-badge">${flashBadge}</div>
      <h1 class="main-title">${title}</h1>
      <p class="sub-title">${subtitle}</p>
    </div>

    <div class="cards-container">
      ${cardsHtml}
    </div>

    <div class="footer-section">
      <div class="trust-badges-row">
        <div class="trust-pill">
          <span class="trust-icon">🚚</span>
          <div class="trust-text">
            <span class="trust-text-main">${r1Parsed.main}</span>
            <span class="trust-text-sub">${r1Parsed.sub}</span>
          </div>
        </div>
        <div class="trust-pill">
          <span class="trust-icon">💵</span>
          <div class="trust-text">
            <span class="trust-text-main">${r2Parsed.main}</span>
            <span class="trust-text-sub">${r2Parsed.sub}</span>
          </div>
        </div>
        <div class="trust-pill">
          <span class="trust-icon">🛡️</span>
          <div class="trust-text">
            <span class="trust-text-main">${r3Parsed.main}</span>
            <span class="trust-text-sub">${r3Parsed.sub}</span>
          </div>
        </div>
      </div>

      <div class="cta-banner">
        <div class="cta-left">
          <div class="whatsapp-circle">
            <svg viewBox="0 0 24 24">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.44C8.94 7.44 8.68 7.5 8.46 7.74C8.24 7.98 7.61 8.57 7.61 9.77C7.61 10.98 8.49 12.14 8.61 12.3C8.74 12.46 10.3 14.88 12.72 15.92C14.73 16.78 15.14 16.61 15.58 16.57C16.03 16.53 17.02 15.98 17.23 15.39C17.43 14.81 17.43 14.31 17.37 14.21C17.31 14.11 17.15 14.04 16.9 13.92C16.65 13.8 15.44 13.2 15.21 13.12C14.99 13.04 14.82 13 14.66 13.25C14.5 13.5 14.02 14.11 13.87 14.28C13.72 14.45 13.58 14.47 13.33 14.35C13.08 14.23 12.27 13.96 11.31 13.11C10.56 12.45 10.06 11.63 9.91 11.38C9.76 11.13 9.89 11 10.02 10.87C10.13 10.76 10.27 10.58 10.39 10.43C10.51 10.29 10.56 10.18 10.64 10.02C10.72 9.85 10.68 9.71 10.62 9.59C10.56 9.46 10.06 8.24 9.85 7.74C9.65 7.25 9.44 7.32 9.29 7.31C9.14 7.3 9.11 7.44 9.11 7.44Z"/>
            </svg>
          </div>
          <div class="cta-info">
            <span class="cta-top">COMMANDEZ DIRECTEMENT SUR WHATSAPP</span>
            <span class="cta-phone">${whatsapp}</span>
          </div>
        </div>
        <div class="cta-btn">
          <span>RÉSERVER</span>
          <span style="font-size:16px;">➔</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

async function render() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 2
  });

  await page.setContent(htmlContent, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const fullOutputPath = path.resolve(outputPath);
  const outDir = path.dirname(fullOutputPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  await page.screenshot({ path: fullOutputPath, type: 'png' });
  console.log('SUCCESS_POSTER_GENERATED:', fullOutputPath);

  await browser.close();
}

render().catch(err => {
  console.error('RENDER_ERROR:', err);
  process.exit(1);
});
